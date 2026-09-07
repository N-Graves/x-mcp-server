import { z } from "zod";
import {
  Dispatcher,
  HttpClient,
  pageSize,
  type ToolDefinition,
} from "@nasdigital/mcp-server-core";
import { OPERATIONS, type CataloguedOperation } from "./generated/operations.js";

export const COVERED = OPERATIONS.filter((o) => o.status === "covered");

export function createDispatcher(http: HttpClient) {
  return new Dispatcher<CataloguedOperation>(http, OPERATIONS, "x_list_operations");
}

export function buildTools(http: HttpClient): ToolDefinition<any>[] {
  const d = createDispatcher(http);

  return [
    {
      name: "x_list_operations",
      description:
        `Browse the X API v2 — ${COVERED.length} of ${OPERATIONS.length} operations are reachable here. ` +
        `Use this to find an operation id for x_call. Many endpoints need a paid access ` +
        `tier on your X account; that is a fact about the account rather than this server, ` +
        `and X reports it clearly if you lack one.`,
      action: "read",
      input: z.object({
        search: z
          .string()
          .optional()
          .describe("Filter by id, path, tag or summary — try 'posts', 'users', 'lists'."),
        include_excluded: z
          .boolean()
          .optional()
          .default(false)
          .describe("Also show the streaming endpoints, which cannot be tool calls."),
      }),
      handler: async ({ search, include_excluded }) => d.browse(search, include_excluded),
    },

    {
      name: "x_call",
      description: "Call any X API v2 operation by id.",
      action: "destructive",
      input: z.object({
        operation_id: z.string().min(1),
        params: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
        body: z.unknown().optional(),
      }),
      handler: ({ operation_id, params, body }) => d.call(operation_id, params ?? {}, body),
    },

    {
      name: "x_get_me",
      description: "The authenticated user. Needs a user-context token, not app-only.",
      action: "read",
      input: z.object({
        "user.fields": z
          .string()
          .optional()
          .describe("Comma-separated, e.g. description,public_metrics,created_at."),
      }),
      handler: (q) => http.get("/2/users/me", q as Record<string, string>),
    },

    {
      name: "x_create_post",
      description:
        "Post to X. This is immediately public. It can be deleted afterwards, which is " +
        "why it is classified a write rather than destructive — but everyone who saw it " +
        "still saw it.",
      action: "write",
      input: z.object({
        text: z
          .string()
          .min(1)
          .max(4000)
          .describe("Post text. 280 characters unless the account has X Premium."),
        reply_to_post_id: z.string().optional().describe("Reply to this post id."),
        quote_post_id: z.string().optional(),
        media_ids: z
          .array(z.string())
          .max(4)
          .optional()
          .describe("Up to 4 media ids, uploaded separately."),
        reply_settings: z.enum(["following", "mentionedUsers"]).optional(),
      }),
      handler: ({ text, reply_to_post_id, quote_post_id, media_ids, reply_settings }) =>
        http.post("/2/tweets", {
          text,
          ...(reply_to_post_id ? { reply: { in_reply_to_tweet_id: reply_to_post_id } } : {}),
          ...(quote_post_id ? { quote_tweet_id: quote_post_id } : {}),
          ...(media_ids?.length ? { media: { media_ids } } : {}),
          ...(reply_settings ? { reply_settings } : {}),
        }),
    },

    {
      name: "x_delete_post",
      description: "Delete one of your own posts. Cannot be undone.",
      action: "destructive",
      input: z.object({ post_id: z.string().min(1) }),
      handler: ({ post_id }) => http.delete(`/2/tweets/${encodeURIComponent(post_id)}`),
    },

    {
      name: "x_search_posts",
      description:
        "Search recent posts. Needs at least Basic access; the free tier cannot read.",
      action: "read",
      input: z.object({
        query: z.string().min(1).describe("X search query syntax."),
        max_results: pageSize(100, 10),
        "tweet.fields": z.string().optional(),
        next_token: z.string().optional(),
      }),
      handler: (q) => http.get("/2/tweets/search/recent", q as Record<string, string>),
    },

    {
      name: "x_get_post",
      description: "One post by id, with whichever fields you ask for.",
      action: "read",
      input: z.object({
        post_id: z.string().min(1),
        "tweet.fields": z.string().optional(),
        expansions: z.string().optional(),
      }),
      handler: ({ post_id, ...q }) =>
        http.get(`/2/tweets/${encodeURIComponent(post_id)}`, q as Record<string, string>),
    },
  ];
}
