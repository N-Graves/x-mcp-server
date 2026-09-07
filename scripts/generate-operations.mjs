/**
 * Generate src/generated/operations.ts from the vendored X API v2 spec.
 *
 *   npm run generate
 *
 * To refresh:
 *   curl -o vendor/x-openapi.json https://api.twitter.com/2/openapi.json
 *   npm run generate && npm test
 *
 * ── On coverage ────────────────────────────────────────────────────────────
 * X publishes 190 operations. Most of them require a paid access tier, and it
 * would be easy to exclude everything above the free tier - but a paid tier is
 * something anyone can buy, so excluding it would deny the API to people who
 * have. The tier a call needs is a fact about your X account, not a limitation
 * of this server, and the README says which is which.
 *
 * What IS excluded is the streaming endpoints, for a technical reason that no
 * amount of access changes. See below.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { buildCatalogue, renderCatalogue, reportBuild } from "@nasdigital/mcp-server-core/generate";

const ROOT = new URL("..", import.meta.url).pathname;
const spec = JSON.parse(readFileSync(join(ROOT, "vendor/x-openapi.json"), "utf8"));

const exclusions = [
  {
    label: "long-lived streams",
    /**
     * These are not request/response endpoints. /2/tweets/search/stream and
     * the firehose, sample and compliance streams hold the connection open
     * and emit posts indefinitely - a stream that returns has ended, which is
     * a failure rather than a result.
     *
     * An MCP tool call has to return. Pointing one at a stream means it hangs
     * until the client's timeout and then reports a timeout, which reads as a
     * broken server rather than a category error. No access tier changes this;
     * consuming a stream needs a long-running process, not a tool call.
     *
     * Note the /stream/rules endpoints are NOT excluded: they configure what a
     * stream would deliver and are ordinary request/response calls, so you can
     * manage your rules here and consume the stream elsewhere.
     */
    match: (op) => /\/stream$/.test(op.path) || /\/stream\/lang\/\w+$/.test(op.path),
    reason:
      "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a " +
      "tool call pointed at it would hang until the client gave up. Manage the rules here " +
      "with the /stream/rules operations and consume the stream in a long-running process.",
  },
];

/**
 * X posts are public the moment they exist. They can be deleted afterwards, so
 * creating one is a write rather than destructive - but deleting, blocking,
 * muting and unfollowing all remove something, and a compliance job cannot be
 * recalled once submitted.
 */
const actionFor = (op) => {
  if (op.method === "GET") return "read";
  if (op.method === "DELETE") return "destructive";
  if (/\/compliance\/jobs$/.test(op.path) && op.method === "POST") return "destructive";
  if (/\/messages\/delete$/.test(op.path)) return "destructive";
  return "write";
};

const result = buildCatalogue(spec, { exclusions, toolFor: () => "x_call", actionFor });
const counts = result.operations.reduce((a, o) => ({ ...a, [o.action]: (a[o.action] ?? 0) + 1 }), {});

const header = `/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/generate-operations.mjs from vendor/x-openapi.json
 * (${spec.info?.title ?? "X API v2"}, OpenAPI ${spec.openapi}).
 *
 * ${result.operations.length} operations: ${result.covered} reachable, ${result.excluded} excluded.
 *
 * The exclusions are the long-lived streams, which never return and so cannot
 * be a tool call at all. Everything else is covered - including the endpoints
 * that need a paid access tier, because a tier is something you can buy and
 * excluding them would deny the API to people who have.
 *
 * ${counts.read ?? 0} read, ${counts.write ?? 0} write, ${counts.destructive ?? 0} destructive.
 */`;

mkdirSync(join(ROOT, "src/generated"), { recursive: true });
writeFileSync(join(ROOT, "src/generated/operations.ts"), renderCatalogue(result, header), "utf8");
reportBuild(result);
console.log(`  by consequence: ${JSON.stringify(counts)}`);
