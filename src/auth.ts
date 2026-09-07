/**
 * X authentication, including the OAuth2 refresh that makes user-context work
 * possible at all.
 *
 * ── The hazard this is built around ────────────────────────────────────────
 * X's OAuth2 access tokens last roughly two hours, and the refresh token is
 * SINGLE USE: every refresh returns a new one and invalidates the old. Persist
 * the new one incorrectly and the chain is broken permanently — the only fix
 * is a fresh manual authorisation in a browser.
 *
 * The server this replaces did:
 *
 *     store.setMany({ ..., OAUTH2_REFRESH_TOKEN: data.refresh_token })
 *
 * with a plain writeFileSync, no lock and no atomic write. Two server
 * processes refreshing at once — which is entirely normal, since MCP clients
 * commonly run one per window — both spend the token, and whichever writes
 * second persists one X has already invalidated. A crash mid-write truncates
 * the file and loses it outright.
 *
 * So the refresh here happens inside TokenStore.withLock, and the write is
 * atomic. It also re-reads under the lock before deciding to refresh at all,
 * because by the time this process got the lock another one may have already
 * done the work — refreshing again would spend a token that is now current.
 */

import { HttpClient, TokenStore, ToolError } from "@nasdigital/mcp-server-core";

const TOKEN_URL = "https://api.x.com/2/oauth2/token";
/** Refresh this far ahead of expiry, so a long call cannot straddle it. */
const SKEW_MS = 5 * 60_000;

export interface XAuth {
  headers(): Promise<Record<string, string>>;
  describe(): string;
}

/**
 * App-only bearer token. No refresh, no expiry, no file.
 *
 * Correct for anything that does not act as a user — most read endpoints. It
 * cannot post, and X's own error for that is clear enough to pass through.
 */
export function appOnlyAuth(bearer: string): XAuth {
  return {
    headers: async () => ({ Authorization: `Bearer ${bearer}` }),
    describe: () => "app-only bearer token (cannot act as a user)",
  };
}

/**
 * OAuth2 user context, refreshing itself as needed.
 *
 * The credentials file holds X_ACCESS_TOKEN, X_REFRESH_TOKEN and
 * X_TOKEN_EXPIRES_AT. Seed it once from your authorisation flow.
 */
export function userAuth(opts: {
  store: TokenStore;
  clientId: string;
  clientSecret?: string;
  fetchImpl?: typeof fetch;
}): XAuth {
  const doFetch = opts.fetchImpl ?? globalThis.fetch;

  const stillValid = (creds: Record<string, string>) => {
    const at = creds.X_ACCESS_TOKEN;
    if (!at) return false;
    const exp = Number(creds.X_TOKEN_EXPIRES_AT ?? 0);
    // No recorded expiry: assume it needs refreshing rather than discovering
    // that it does not, halfway through somebody's work.
    return exp > 0 && Date.now() + SKEW_MS < exp;
  };

  async function refresh(): Promise<string> {
    return opts.store.withLock(async () => {
      // Re-read INSIDE the lock. Another process may have refreshed while this
      // one waited, and refreshing again would spend a token that is current.
      const creds = opts.store.read();
      if (stillValid(creds)) return creds.X_ACCESS_TOKEN!;

      const refreshToken = creds.X_REFRESH_TOKEN;
      if (!refreshToken) {
        throw new ToolError(
          "No X refresh token is stored, and the access token has expired. " +
            "Re-run your authorisation flow and write X_ACCESS_TOKEN, X_REFRESH_TOKEN " +
            "and X_TOKEN_EXPIRES_AT into the credentials file.",
        );
      }

      const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: opts.clientId,
      });
      const headers: Record<string, string> = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      if (opts.clientSecret) {
        headers.Authorization =
          "Basic " + Buffer.from(`${opts.clientId}:${opts.clientSecret}`).toString("base64");
      }

      const res = await doFetch(TOKEN_URL, { method: "POST", headers, body });
      if (!res.ok) {
        // X's error bodies echo request context, so the status is reported and
        // the body is not - the same rule the HTTP layer applies everywhere.
        throw new ToolError(
          `Refreshing the X access token failed (HTTP ${res.status}). ` +
            (res.status === 400 || res.status === 401
              ? "The refresh token has probably already been spent or revoked; " +
                "re-run your authorisation flow."
              : "Try again shortly."),
        );
      }

      const data = (await res.json()) as {
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
      };
      if (!data.access_token) {
        throw new ToolError("X returned no access token when refreshing.");
      }

      opts.store.write({
        X_ACCESS_TOKEN: data.access_token,
        // X rotates this on every refresh. Losing the new one is what breaks
        // the chain permanently, so it is written in the same atomic write as
        // the access token rather than separately.
        ...(data.refresh_token ? { X_REFRESH_TOKEN: data.refresh_token } : {}),
        X_TOKEN_EXPIRES_AT: String(Date.now() + (data.expires_in ?? 7200) * 1000),
      });

      return data.access_token;
    });
  }

  return {
    async headers() {
      const creds = opts.store.read();
      const token = stillValid(creds) ? creds.X_ACCESS_TOKEN! : await refresh();
      return { Authorization: `Bearer ${token}` };
    },
    describe: () => "OAuth2 user context, refreshing automatically",
  };
}

/** Build an HttpClient that authenticates itself. */
export function authedClient(auth: XAuth, version: string): HttpClient {
  return new HttpClient({
    baseUrl: process.env.X_BASE_URL || "https://api.x.com",
    headers: { "User-Agent": `x-mcp-server/${version}` },
    dynamicHeaders: () => auth.headers(),
    timeoutMs: 30_000,
  });
}
