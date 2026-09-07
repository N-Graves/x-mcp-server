import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { readFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  HttpClient,
  TokenStore,
  checkCoverage,
  formatCoverage,
  operationsFromOpenApi,
} from "@nasdigitaluk/mcp-server-core";
import { OPERATIONS } from "../src/generated/operations.js";
import { buildTools, createDispatcher, COVERED } from "../src/tools.js";
import { userAuth, appOnlyAuth } from "../src/auth.js";

const spec = JSON.parse(readFileSync(join(import.meta.dirname, "../vendor/x-openapi.json"), "utf8"));

function client() {
  const calls: { url: string; method: string; body?: string }[] = [];
  const http = new HttpClient({
    baseUrl: "https://api.x.com",
    fetchImpl: (async (url: string, opts: RequestInit = {}) => {
      calls.push({ url, method: opts.method ?? "GET", body: opts.body as string | undefined });
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    }) as unknown as typeof fetch,
  });
  return { http, calls };
}

const toolNamed = (http: HttpClient, name: string) => buildTools(http).find((t) => t.name === name)!;

describe("coverage", () => {
  it("accounts for every operation X publishes", () => {
    const report = checkCoverage(OPERATIONS, operationsFromOpenApi(spec));
    expect(report.ok, formatCoverage(report)).toBe(true);
  });

  it("excludes the streams, because a stream can never return from a tool call", () => {
    const excluded = OPERATIONS.filter((o) => o.status === "excluded");
    expect(excluded).toHaveLength(15);
    expect(excluded.every((o) => /\/stream/.test(o.path))).toBe(true);
    expect(excluded.every((o) => /never returns|hang/i.test(o.reason ?? ""))).toBe(true);
  });

  it("keeps the stream RULES endpoints, which are ordinary calls", () => {
    // These configure what a stream would deliver. Excluding them alongside the
    // streams would mean you could not manage your rules here at all.
    const rules = OPERATIONS.filter((o) => o.path.includes("/stream/rules"));
    expect(rules.length).toBeGreaterThan(0);
    expect(rules.every((o) => o.status === "covered")).toBe(true);
  });

  it("covers the paid-tier endpoints rather than excluding them", () => {
    // A tier is something you can buy, unlike an admin key you cannot obtain.
    // Excluding them would deny the API to people who have paid.
    expect(COVERED.length).toBe(175);
  });
});

describe("tools", () => {
  it("builds X's nested reply and media shapes rather than a flat body", async () => {
    const { http, calls } = client();
    await toolNamed(http, "x_create_post").handler({
      text: "hello",
      reply_to_post_id: "1",
      media_ids: ["m1", "m2"],
    });
    expect(JSON.parse(calls[0]!.body!)).toEqual({
      text: "hello",
      reply: { in_reply_to_tweet_id: "1" },
      media: { media_ids: ["m1", "m2"] },
    });
  });

  it("omits the optional shapes entirely when not asked for", async () => {
    const { http, calls } = client();
    await toolNamed(http, "x_create_post").handler({ text: "just text" });
    expect(JSON.parse(calls[0]!.body!)).toEqual({ text: "just text" });
  });

  it("refuses more than four media ids, as X does", () => {
    const { http } = client();
    const t = toolNamed(http, "x_create_post");
    expect(t.input.safeParse({ text: "x", media_ids: ["1", "2", "3", "4", "5"] }).success).toBe(false);
  });

  it("classifies posting as a write and deleting as destructive", () => {
    const { http } = client();
    expect(toolNamed(http, "x_create_post").action).toBe("write");
    expect(toolNamed(http, "x_delete_post").action).toBe("destructive");
  });
});

describe("OAuth2 refresh", () => {
  let dir: string;
  let store: TokenStore;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "x-auth-"));
    store = new TokenStore(join(dir, "creds"));
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  const fakeToken = (n: number) =>
    (async () =>
      new Response(
        JSON.stringify({ access_token: `at${n}`, refresh_token: `rt${n}`, expires_in: 7200 }),
        { status: 200, headers: { "content-type": "application/json" } },
      )) as unknown as typeof fetch;

  it("uses the stored token while it is still valid", async () => {
    store.write({
      X_ACCESS_TOKEN: "current",
      X_REFRESH_TOKEN: "r",
      X_TOKEN_EXPIRES_AT: String(Date.now() + 3_600_000),
    });
    let refreshed = false;
    const auth = userAuth({
      store,
      clientId: "cid",
      fetchImpl: (async () => { refreshed = true; return new Response("{}"); }) as unknown as typeof fetch,
    });
    expect(await auth.headers()).toEqual({ Authorization: "Bearer current" });
    expect(refreshed).toBe(false);
  });

  it("refreshes when the token has expired, and persists the ROTATED refresh token", async () => {
    // X invalidates the old refresh token on every use. Failing to persist the
    // new one breaks the chain permanently.
    store.write({
      X_ACCESS_TOKEN: "old",
      X_REFRESH_TOKEN: "rt-old",
      X_TOKEN_EXPIRES_AT: String(Date.now() - 1000),
    });
    const auth = userAuth({ store, clientId: "cid", fetchImpl: fakeToken(1) });
    expect(await auth.headers()).toEqual({ Authorization: "Bearer at1" });
    expect(store.get("X_REFRESH_TOKEN")).toBe("rt1");
    expect(Number(store.get("X_TOKEN_EXPIRES_AT"))).toBeGreaterThan(Date.now());
  });

  it("refreshes ahead of expiry so a call cannot straddle it", async () => {
    // Two minutes left is inside the skew window, so it refreshes rather than
    // starting a request with a token that dies mid-flight.
    store.write({
      X_ACCESS_TOKEN: "old",
      X_REFRESH_TOKEN: "rt-old",
      X_TOKEN_EXPIRES_AT: String(Date.now() + 120_000),
    });
    const auth = userAuth({ store, clientId: "cid", fetchImpl: fakeToken(2) });
    expect(await auth.headers()).toEqual({ Authorization: "Bearer at2" });
  });

  it("spends the refresh token only ONCE across concurrent callers", async () => {
    // The failure this prevents: two MCP clients running at the same time both
    // refresh, and whichever writes second persists a token X has already
    // invalidated.
    store.write({
      X_ACCESS_TOKEN: "old",
      X_REFRESH_TOKEN: "rt-old",
      X_TOKEN_EXPIRES_AT: String(Date.now() - 1000),
    });
    let refreshes = 0;
    const auth = userAuth({
      store,
      clientId: "cid",
      fetchImpl: (async () => {
        refreshes++;
        await new Promise((r) => setTimeout(r, 20));
        return new Response(
          JSON.stringify({ access_token: "at", refresh_token: "rt", expires_in: 7200 }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }) as unknown as typeof fetch,
    });

    const results = await Promise.all([auth.headers(), auth.headers(), auth.headers()]);
    expect(refreshes).toBe(1);
    expect(results.every((h) => h.Authorization === "Bearer at")).toBe(true);
  });

  it("explains a spent refresh token rather than echoing X's error body", async () => {
    store.write({
      X_ACCESS_TOKEN: "old",
      X_REFRESH_TOKEN: "spent",
      X_TOKEN_EXPIRES_AT: String(Date.now() - 1000),
    });
    const auth = userAuth({
      store,
      clientId: "cid",
      fetchImpl: (async () =>
        new Response("request context and maybe a secret", { status: 400 })) as unknown as typeof fetch,
    });
    await expect(auth.headers()).rejects.toThrow(/already been spent or revoked/i);
    await expect(auth.headers()).rejects.not.toThrow(/request context/);
  });

  it("says what to do when there is no refresh token at all", async () => {
    store.write({ X_ACCESS_TOKEN: "old", X_TOKEN_EXPIRES_AT: String(Date.now() - 1000) });
    const auth = userAuth({ store, clientId: "cid", fetchImpl: fakeToken(3) });
    await expect(auth.headers()).rejects.toThrow(/authorisation flow/i);
  });

  it("app-only auth needs no file and never refreshes", async () => {
    expect(await appOnlyAuth("bearer123").headers()).toEqual({ Authorization: "Bearer bearer123" });
  });
});
