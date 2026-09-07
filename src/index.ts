#!/usr/bin/env node
/**
 * x-mcp-server — a Model Context Protocol server for the X API v2.
 *
 * Two ways to authenticate. Pick one:
 *
 *   App-only (simplest, cannot post):
 *     X_BEARER_TOKEN=...
 *
 *   User context (can post, refreshes itself):
 *     X_CLIENT_ID=...
 *     X_CLIENT_SECRET=...           (confidential clients only)
 *     X_CREDENTIALS_FILE=~/.x-mcp   holding X_ACCESS_TOKEN, X_REFRESH_TOKEN
 *                                   and X_TOKEN_EXPIRES_AT, seeded once from
 *                                   your authorisation flow.
 *
 * Also:
 *   X_BASE_URL           optional. Defaults to https://api.x.com
 *   MCP_READ_ONLY=1      refuse anything that changes state.
 *   MCP_NO_DESTRUCTIVE=1 allow writes, refuse deletes and compliance jobs.
 *
 * ⚠️  X's refresh tokens are SINGLE USE and rotate on every refresh. This
 *     server refreshes under a lock and writes atomically, and re-checks
 *     inside the lock before spending one — because two MCP clients running at
 *     once is normal, and two concurrent refreshes break the chain
 *     permanently. See src/auth.ts.
 */

import {
  TokenStore,
  authorizerFromEnv,
  runServer,
} from "@nasdigital/mcp-server-core";
import { homedir } from "node:os";
import { join } from "node:path";
import { appOnlyAuth, authedClient, userAuth, type XAuth } from "./auth.js";
import { buildTools, COVERED } from "./tools.js";
import { OPERATIONS } from "./generated/operations.js";

const VERSION = "1.0.0";

function resolveAuth(): XAuth {
  const bearer = process.env.X_BEARER_TOKEN;
  const clientId = process.env.X_CLIENT_ID;

  if (clientId) {
    const path =
      process.env.X_CREDENTIALS_FILE?.replace(/^~(?=$|\/)/, homedir()) ??
      join(homedir(), ".x-mcp-credentials");
    return userAuth({
      store: new TokenStore(path),
      clientId,
      clientSecret: process.env.X_CLIENT_SECRET,
    });
  }

  if (bearer) return appOnlyAuth(bearer);

  throw new Error(
    "No X credentials. Set X_BEARER_TOKEN for app-only access, or X_CLIENT_ID " +
      "(plus a credentials file) for user context. See the README.",
  );
}

async function main() {
  const auth = resolveAuth();
  const http = authedClient(auth, VERSION);

  await runServer({
    name: "x-mcp-server",
    version: VERSION,
    authorizer: authorizerFromEnv(),
    tools: buildTools(http),
  });

  console.error(
    `X API v2: ${COVERED.length} of ${OPERATIONS.length} operations reachable ` +
      `(${OPERATIONS.length - COVERED.length} streaming endpoints cannot be tool calls). ` +
      `Auth: ${auth.describe()}.`,
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
