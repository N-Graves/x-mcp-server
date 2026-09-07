# x-mcp-server

A [Model Context Protocol](https://modelcontextprotocol.io) server for the **X API v2**.

**175 of X's 190 published operations** are reachable. The 15 that are not are the streaming endpoints, excluded for a reason no access tier changes.

MIT licensed.

## Install

```bash
npm install -g @nasdigital/x-mcp
```

## Authentication

Two ways. Pick one.

**App-only** — simplest, cannot post:

```json
{ "env": { "X_BEARER_TOKEN": "your-bearer-token" } }
```

**User context** — can post, and refreshes itself:

```json
{
  "env": {
    "X_CLIENT_ID": "your-client-id",
    "X_CLIENT_SECRET": "your-client-secret",
    "X_CREDENTIALS_FILE": "~/.x-mcp-credentials"
  }
}
```

Seed the credentials file once from your authorisation flow:

```
X_ACCESS_TOKEN=...
X_REFRESH_TOKEN=...
X_TOKEN_EXPIRES_AT=1757260800000
```

## ⚠️ X's refresh tokens are single use

This is the part worth reading before you trust any X integration, including this one.

X access tokens last about **two hours**, and the refresh token is **single use** — every refresh returns a new one and invalidates the old. Persist the new one incorrectly and the chain breaks **permanently**; the only fix is re-authorising in a browser.

Running two MCP clients at once is completely normal. Both refresh, both spend the same token, and whichever writes second saves one X has already invalidated. The server this replaces did the write with a plain `writeFileSync` — no lock, no atomic write.

Here:

- the refresh happens inside an **exclusive lock**, so only one process spends the token;
- it **re-reads under the lock** before refreshing, because another process may have already done the work while this one waited;
- the write is **atomic** (temp file, `fsync`, rename), so a crash cannot truncate it;
- the file is **chmod'd on every write**, not only when created — a pre-existing `0644` credentials file used to stay world-readable while the code read as though it had secured it;
- a **stale lock** from a killed process is broken after 30s rather than wedging everything after it.

There is a test asserting that three concurrent callers cause exactly **one** refresh.

## What is excluded, and why

The 15 streaming endpoints: `/2/tweets/search/stream`, the firehose and sample streams, and the compliance streams.

These are not request/response endpoints. They hold the connection open and emit posts indefinitely — a stream that returns has *ended*, which is a failure rather than a result. An MCP tool call has to return, so pointing one at a stream means it hangs until the client's timeout and then reports a timeout, which reads as a broken server rather than a category error.

No access tier changes this. Consuming a stream needs a long-running process, not a tool call.

**The `/stream/rules` endpoints are NOT excluded.** They configure what a stream would deliver and are ordinary calls, so you can manage your rules here and consume the stream elsewhere.

## On paid tiers

Most of X's API needs a paid access tier. Those endpoints are **covered anyway**, because a tier is something you can buy — unlike an admin key you simply cannot obtain. Excluding them would deny the API to people who have paid for it. X reports clearly when your tier is insufficient, and that error passes through.

## Tools

Seven tools for 175 operations.

| Tool | |
|---|---|
| `x_list_operations` | Browse the catalogue. Start here. |
| `x_call` | Call any operation by id. |
| `x_get_me` | The authenticated user. Needs user context. |
| `x_create_post` | Post. Immediately public. |
| `x_delete_post` | Delete one of yours. Destructive. |
| `x_search_posts` | Search recent posts. Needs Basic or above. |
| `x_get_post` | One post by id. |

Posting is classified a **write**, not destructive, because a post can be deleted — but everyone who saw it still saw it, and the tool description says so.

Of 190 operations: **104 read, 57 write, 29 destructive**.

## Refreshing the catalogue

```bash
curl -o vendor/x-openapi.json https://api.twitter.com/2/openapi.json
npm run generate && npm test
```

## Testing

```bash
npm test                              # 15 tests, including the refresh-concurrency one
X_BEARER_TOKEN=x npm run smoke        # real MCP over stdio
```

## Built on

[`@nasdigital/mcp-server-core`](https://github.com/N-Graves/mcp-server-core).

## Licence

MIT.
