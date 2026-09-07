/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/generate-operations.mjs from vendor/x-openapi.json
 * (X API v2, OpenAPI 3.0.0).
 *
 * 190 operations: 175 reachable, 15 excluded.
 *
 * The exclusions are the long-lived streams, which never return and so cannot
 * be a tool call at all. Everything else is covered - including the endpoints
 * that need a paid access tier, because a tier is something you can buy and
 * excluding them would deny the API to people who have.
 *
 * 104 read, 57 write, 29 destructive.
 */
import type { Operation } from "@nasdigitaluk/mcp-server-core";

export interface CataloguedOperation extends Operation {
  tags: string[];
  summary: string;
  pathParams: string[];
  queryParams: string[];
  hasBody: boolean;
  /** Consequence, not HTTP verb: destructive means irreversible OR chargeable. */
  action: "read" | "write" | "destructive";
}

export const OPERATIONS: CataloguedOperation[] = [
  {
    "id": "getDeveloperAccount",
    "method": "GET",
    "path": "/2/account",
    "tags": [
      "Account"
    ],
    "summary": "Get developer account",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "ensureAccount",
    "method": "POST",
    "path": "/2/account",
    "tags": [
      "Account"
    ],
    "summary": "Ensure developer account",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getAccountActivitySubscriptionCount",
    "method": "GET",
    "path": "/2/account_activity/subscriptions/count",
    "tags": [
      "Account Activity"
    ],
    "summary": "Get Account Activity Subscription Count",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "deleteAccountActivitySubscription",
    "method": "DELETE",
    "path": "/2/account_activity/webhooks/{webhook_id}/subscriptions/{user_id}/all",
    "tags": [
      "Account Activity"
    ],
    "summary": "Delete subscription",
    "pathParams": [
      "webhook_id",
      "user_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "validateAccountActivitySubscription",
    "method": "GET",
    "path": "/2/account_activity/webhooks/{webhook_id}/subscriptions/all",
    "tags": [
      "Account Activity"
    ],
    "summary": "Validate Account Activity Subscription",
    "pathParams": [
      "webhook_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createAccountActivitySubscription",
    "method": "POST",
    "path": "/2/account_activity/webhooks/{webhook_id}/subscriptions/all",
    "tags": [
      "Account Activity"
    ],
    "summary": "Create subscription",
    "pathParams": [
      "webhook_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getAccountActivitySubscriptions",
    "method": "GET",
    "path": "/2/account_activity/webhooks/{webhook_id}/subscriptions/all/list",
    "tags": [
      "Account Activity"
    ],
    "summary": "Get Account Activity Subscriptions",
    "pathParams": [
      "webhook_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "activityStream",
    "method": "GET",
    "path": "/2/activity/stream",
    "tags": [
      "Stream"
    ],
    "summary": "Activity Stream",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "start_time",
      "end_time"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "deleteActivitySubscriptionsByIds",
    "method": "DELETE",
    "path": "/2/activity/subscriptions",
    "tags": [
      "Activity"
    ],
    "summary": "Delete X activity subscriptions by IDs",
    "pathParams": [],
    "queryParams": [
      "ids"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getActivitySubscriptions",
    "method": "GET",
    "path": "/2/activity/subscriptions",
    "tags": [
      "Activity"
    ],
    "summary": "Get X activity subscriptions",
    "pathParams": [],
    "queryParams": [
      "max_results",
      "pagination_token"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createActivitySubscription",
    "method": "POST",
    "path": "/2/activity/subscriptions",
    "tags": [
      "Activity"
    ],
    "summary": "Create X activity subscription",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deleteActivitySubscription",
    "method": "DELETE",
    "path": "/2/activity/subscriptions/{subscription_id}",
    "tags": [
      "Activity"
    ],
    "summary": "Deletes X activity subscription",
    "pathParams": [
      "subscription_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "updateActivitySubscription",
    "method": "PUT",
    "path": "/2/activity/subscriptions/{subscription_id}",
    "tags": [
      "Activity"
    ],
    "summary": "Update X activity subscription",
    "pathParams": [
      "subscription_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "articlePublish",
    "method": "POST",
    "path": "/2/articles/{article_id}/publish",
    "tags": [
      "Articles"
    ],
    "summary": "Publish Article",
    "pathParams": [
      "article_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "articleCreateDraft",
    "method": "POST",
    "path": "/2/articles/draft",
    "tags": [
      "Articles"
    ],
    "summary": "Create draft Article",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getBots",
    "method": "GET",
    "path": "/2/bots",
    "tags": [
      "Bots"
    ],
    "summary": "Get Bots",
    "pathParams": [],
    "queryParams": [
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createBot",
    "method": "POST",
    "path": "/2/bots",
    "tags": [
      "Bots"
    ],
    "summary": "Create a bot",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deleteBot",
    "method": "DELETE",
    "path": "/2/bots/{id}",
    "tags": [
      "Bots"
    ],
    "summary": "Delete Bot",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "updateBot",
    "method": "PUT",
    "path": "/2/bots/{id}",
    "tags": [
      "Bots"
    ],
    "summary": "Update Bot",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "revokeBotToken",
    "method": "DELETE",
    "path": "/2/bots/{id}/token",
    "tags": [
      "Bots"
    ],
    "summary": "Revoke Bot Token",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "rotateBotToken",
    "method": "POST",
    "path": "/2/bots/{id}/token",
    "tags": [
      "Bots"
    ],
    "summary": "Rotate Bot Token",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "listBroadcasts",
    "method": "GET",
    "path": "/2/broadcasts",
    "tags": [
      "Broadcasts"
    ],
    "summary": "List broadcasts",
    "pathParams": [],
    "queryParams": [
      "ids",
      "max_results",
      "pagination_token",
      "broadcast.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getBroadcast",
    "method": "GET",
    "path": "/2/broadcasts/{id}",
    "tags": [
      "Broadcasts"
    ],
    "summary": "Get a broadcast",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "broadcast.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getBroadcastChat",
    "method": "GET",
    "path": "/2/broadcasts/{id}/chat",
    "tags": [
      "Broadcasts"
    ],
    "summary": "Get broadcast chat history",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "broadcast_chat_message.fields",
      "expansions",
      "user.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "sendBroadcastChat",
    "method": "POST",
    "path": "/2/broadcasts/{id}/chat",
    "tags": [
      "Broadcasts"
    ],
    "summary": "Send a chat message to a live broadcast",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deleteBroadcastChatMessage",
    "method": "DELETE",
    "path": "/2/broadcasts/{id}/chat/{message_id}",
    "tags": [
      "Broadcasts"
    ],
    "summary": "Remove a chat message from a live broadcast",
    "pathParams": [
      "id",
      "message_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "muteBroadcastChatUser",
    "method": "POST",
    "path": "/2/broadcasts/{id}/chat/mutes",
    "tags": [
      "Broadcasts"
    ],
    "summary": "Mute or time out a user in a broadcast chat",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "unmuteBroadcastChatUser",
    "method": "DELETE",
    "path": "/2/broadcasts/{id}/chat/mutes/{user_id}",
    "tags": [
      "Broadcasts"
    ],
    "summary": "Unmute a user in a broadcast chat",
    "pathParams": [
      "id",
      "user_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "listScheduledBroadcasts",
    "method": "GET",
    "path": "/2/broadcasts/scheduled",
    "tags": [
      "Broadcasts"
    ],
    "summary": "List scheduled broadcasts",
    "pathParams": [],
    "queryParams": [
      "max_results",
      "oldest_start_time",
      "newest_start_time",
      "pagination_token"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createScheduledBroadcast",
    "method": "POST",
    "path": "/2/broadcasts/scheduled",
    "tags": [
      "Broadcasts"
    ],
    "summary": "Create a scheduled broadcast",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deleteScheduledBroadcast",
    "method": "DELETE",
    "path": "/2/broadcasts/scheduled/{id}",
    "tags": [
      "Broadcasts"
    ],
    "summary": "Delete a scheduled broadcast",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "roll_forward"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getScheduledBroadcast",
    "method": "GET",
    "path": "/2/broadcasts/scheduled/{id}",
    "tags": [
      "Broadcasts"
    ],
    "summary": "Get a scheduled broadcast",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "updateScheduledBroadcast",
    "method": "PUT",
    "path": "/2/broadcasts/scheduled/{id}",
    "tags": [
      "Broadcasts"
    ],
    "summary": "Update a scheduled broadcast",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "goLiveScheduledBroadcast",
    "method": "POST",
    "path": "/2/broadcasts/scheduled/{id}/live",
    "tags": [
      "Broadcasts"
    ],
    "summary": "Go live on a scheduled broadcast",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getChatConversations",
    "method": "GET",
    "path": "/2/chat/conversations",
    "tags": [
      "Chat"
    ],
    "summary": "Get Chat Conversations",
    "pathParams": [],
    "queryParams": [
      "max_results",
      "pagination_token",
      "chat_conversation.fields",
      "expansions",
      "user.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getChatConversation",
    "method": "GET",
    "path": "/2/chat/conversations/{id}",
    "tags": [
      "Chat"
    ],
    "summary": "Get Chat Conversation",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "chat_conversation.fields",
      "expansions",
      "user.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getChatConversationEvents",
    "method": "GET",
    "path": "/2/chat/conversations/{id}/events",
    "tags": [
      "Chat"
    ],
    "summary": "Get Chat Conversation Events",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "chat_message_event.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "addConversationKeys",
    "method": "POST",
    "path": "/2/chat/conversations/{id}/keys",
    "tags": [
      "Chat"
    ],
    "summary": "Add Conversation Keys",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "addChatGroupMembers",
    "method": "POST",
    "path": "/2/chat/conversations/{id}/members",
    "tags": [
      "Chat"
    ],
    "summary": "Add members to a Chat group conversation",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "sendChatMessage",
    "method": "POST",
    "path": "/2/chat/conversations/{id}/messages",
    "tags": [
      "Chat"
    ],
    "summary": "Send Chat Message",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deleteChatMessages",
    "method": "POST",
    "path": "/2/chat/conversations/{id}/messages/delete",
    "tags": [
      "Chat"
    ],
    "summary": "Delete Chat messages",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "markChatConversationRead",
    "method": "POST",
    "path": "/2/chat/conversations/{id}/read",
    "tags": [
      "Chat"
    ],
    "summary": "Mark Conversation as Read",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "sendChatTypingIndicator",
    "method": "POST",
    "path": "/2/chat/conversations/{id}/typing",
    "tags": [
      "Chat"
    ],
    "summary": "Send Typing Indicator",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "createChatConversation",
    "method": "POST",
    "path": "/2/chat/conversations/group",
    "tags": [
      "Chat"
    ],
    "summary": "Create Chat Group Conversation",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "initializeChatGroup",
    "method": "POST",
    "path": "/2/chat/conversations/group/initialize",
    "tags": [
      "Chat"
    ],
    "summary": "Initialize Chat Group",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "chatMediaDownload",
    "method": "GET",
    "path": "/2/chat/media/{id}/{media_hash_key}",
    "tags": [
      "Chat"
    ],
    "summary": "Download Chat Media",
    "pathParams": [
      "id",
      "media_hash_key"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "chatMediaUploadAppend",
    "method": "POST",
    "path": "/2/chat/media/upload/{id}/append",
    "tags": [
      "Chat"
    ],
    "summary": "Append Chat Media Upload",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "chatMediaUploadFinalize",
    "method": "POST",
    "path": "/2/chat/media/upload/{id}/finalize",
    "tags": [
      "Chat"
    ],
    "summary": "Finalize Chat Media Upload",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "chatMediaUploadInitialize",
    "method": "POST",
    "path": "/2/chat/media/upload/initialize",
    "tags": [
      "Chat"
    ],
    "summary": "Initialize Chat Media Upload",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getCommunitiesById",
    "method": "GET",
    "path": "/2/communities/{id}",
    "tags": [
      "Communities"
    ],
    "summary": "Get Communities by ID",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "community.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "searchCommunities",
    "method": "GET",
    "path": "/2/communities/search",
    "tags": [
      "Communities"
    ],
    "summary": "Search Communities",
    "pathParams": [],
    "queryParams": [
      "query",
      "max_results",
      "next_token",
      "pagination_token",
      "community.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getComplianceJobs",
    "method": "GET",
    "path": "/2/compliance/jobs",
    "tags": [
      "Compliance"
    ],
    "summary": "Get Compliance Jobs",
    "pathParams": [],
    "queryParams": [
      "type",
      "status",
      "compliance_job.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createComplianceJobs",
    "method": "POST",
    "path": "/2/compliance/jobs",
    "tags": [
      "Compliance"
    ],
    "summary": "Create Compliance Job",
    "pathParams": [],
    "queryParams": [
      "compliance_job.fields"
    ],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "deleteComplianceJobsById",
    "method": "DELETE",
    "path": "/2/compliance/jobs/{id}",
    "tags": [
      "Compliance"
    ],
    "summary": "Cancel Compliance Job",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "compliance_job.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getComplianceJobsById",
    "method": "GET",
    "path": "/2/compliance/jobs/{id}",
    "tags": [
      "Compliance"
    ],
    "summary": "Get Compliance Job by ID",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "compliance_job.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "downloadComplianceJobResults",
    "method": "GET",
    "path": "/2/compliance/jobs/{id}/download",
    "tags": [
      "Compliance"
    ],
    "summary": "Download Compliance Job Results",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "token",
      "compliance_job.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "uploadComplianceJobSubmission",
    "method": "PUT",
    "path": "/2/compliance/jobs/{id}/upload",
    "tags": [
      "Compliance"
    ],
    "summary": "Upload Compliance Job Submission",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "token",
      "compliance_job.fields"
    ],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deleteConnectionsByUuids",
    "method": "DELETE",
    "path": "/2/connections",
    "tags": [
      "Connections"
    ],
    "summary": "Terminate multiple connections",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getConnectionHistory",
    "method": "GET",
    "path": "/2/connections",
    "tags": [
      "Connections"
    ],
    "summary": "Get Connection History",
    "pathParams": [],
    "queryParams": [
      "status",
      "endpoints",
      "max_results",
      "pagination_token",
      "connection.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "deleteConnectionsByEndpoint",
    "method": "DELETE",
    "path": "/2/connections/{endpoint_id}",
    "tags": [
      "Connections"
    ],
    "summary": "Terminate connections by endpoint",
    "pathParams": [
      "endpoint_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "deleteAllConnections",
    "method": "DELETE",
    "path": "/2/connections/all",
    "tags": [
      "Connections"
    ],
    "summary": "Terminate all connections",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "createDirectMessagesConversation",
    "method": "POST",
    "path": "/2/dm_conversations",
    "tags": [
      "Direct Messages"
    ],
    "summary": "Create DM conversation",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "createDirectMessagesByConversationId",
    "method": "POST",
    "path": "/2/dm_conversations/{dm_conversation_id}/messages",
    "tags": [
      "Direct Messages"
    ],
    "summary": "Create Direct Messages by Conversation ID",
    "pathParams": [
      "dm_conversation_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getDirectMessagesEventsByConversationId",
    "method": "GET",
    "path": "/2/dm_conversations/{id}/dm_events",
    "tags": [
      "Direct Messages"
    ],
    "summary": "Get Direct Messages Events by Conversation ID",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "event_types",
      "dm_event.fields",
      "expansions",
      "user.fields",
      "post.fields",
      "media.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "dmConversationsMediaDownload",
    "method": "GET",
    "path": "/2/dm_conversations/media/{dm_id}/{media_id}/{resource_id}",
    "tags": [
      "Direct Messages"
    ],
    "summary": "Download DM Media",
    "pathParams": [
      "dm_id",
      "media_id",
      "resource_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getDirectMessagesEventsByParticipantId",
    "method": "GET",
    "path": "/2/dm_conversations/with/{participant_id}/dm_events",
    "tags": [
      "Direct Messages"
    ],
    "summary": "Get Direct Messages Events by Participant ID",
    "pathParams": [
      "participant_id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "event_types",
      "dm_event.fields",
      "expansions",
      "user.fields",
      "post.fields",
      "media.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createDirectMessagesByParticipantId",
    "method": "POST",
    "path": "/2/dm_conversations/with/{participant_id}/messages",
    "tags": [
      "Direct Messages"
    ],
    "summary": "Create DM message by participant ID",
    "pathParams": [
      "participant_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getDirectMessagesEvents",
    "method": "GET",
    "path": "/2/dm_events",
    "tags": [
      "Direct Messages"
    ],
    "summary": "Get Direct Messages Events",
    "pathParams": [],
    "queryParams": [
      "max_results",
      "pagination_token",
      "event_types",
      "dm_event.fields",
      "expansions",
      "user.fields",
      "post.fields",
      "media.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "deleteDirectMessagesEvents",
    "method": "DELETE",
    "path": "/2/dm_events/{event_id}",
    "tags": [
      "Direct Messages"
    ],
    "summary": "Delete DM event",
    "pathParams": [
      "event_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getDirectMessagesEventsById",
    "method": "GET",
    "path": "/2/dm_events/{event_id}",
    "tags": [
      "Direct Messages"
    ],
    "summary": "Get Direct Messages Events by ID",
    "pathParams": [
      "event_id"
    ],
    "queryParams": [
      "dm_event.fields",
      "expansions",
      "user.fields",
      "post.fields",
      "media.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "streamLikesCompliance",
    "method": "GET",
    "path": "/2/likes/compliance/stream",
    "tags": [
      "Stream"
    ],
    "summary": "Stream Likes compliance data",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "start_time",
      "end_time"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "streamLikesFirehose",
    "method": "GET",
    "path": "/2/likes/firehose/stream",
    "tags": [
      "Stream"
    ],
    "summary": "Stream all Likes",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "partition",
      "start_time",
      "end_time",
      "like_with_tweet_author.fields",
      "expansions",
      "media.fields",
      "user.fields",
      "tweet.fields"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "streamLikesSample10",
    "method": "GET",
    "path": "/2/likes/sample10/stream",
    "tags": [
      "Stream"
    ],
    "summary": "Stream sampled Likes",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "partition",
      "start_time",
      "end_time",
      "like_with_tweet_author.fields",
      "expansions",
      "media.fields",
      "user.fields",
      "tweet.fields"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "createLists",
    "method": "POST",
    "path": "/2/lists",
    "tags": [
      "Lists"
    ],
    "summary": "Create Lists",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deleteLists",
    "method": "DELETE",
    "path": "/2/lists/{id}",
    "tags": [
      "Lists"
    ],
    "summary": "Delete List",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getListsById",
    "method": "GET",
    "path": "/2/lists/{id}",
    "tags": [
      "Lists"
    ],
    "summary": "Get Lists by ID",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "list.fields",
      "expansions",
      "user.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "updateLists",
    "method": "PUT",
    "path": "/2/lists/{id}",
    "tags": [
      "Lists"
    ],
    "summary": "Update List",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getListsFollowers",
    "method": "GET",
    "path": "/2/lists/{id}/followers",
    "tags": [
      "Lists"
    ],
    "summary": "Get Lists Followers",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getListsMembers",
    "method": "GET",
    "path": "/2/lists/{id}/members",
    "tags": [
      "Lists"
    ],
    "summary": "Get Lists Members",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "addListsMember",
    "method": "POST",
    "path": "/2/lists/{id}/members",
    "tags": [
      "Lists"
    ],
    "summary": "Add Lists Member",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "removeListsMemberByUserId",
    "method": "DELETE",
    "path": "/2/lists/{id}/members/{user_id}",
    "tags": [
      "Lists"
    ],
    "summary": "Remove a List member",
    "pathParams": [
      "id",
      "user_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getListsPosts",
    "method": "GET",
    "path": "/2/lists/{id}/tweets",
    "tags": [
      "Lists"
    ],
    "summary": "Get Lists Posts",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getMediaByMediaKeys",
    "method": "GET",
    "path": "/2/media",
    "tags": [
      "Media"
    ],
    "summary": "Get Media by media keys",
    "pathParams": [],
    "queryParams": [
      "media_keys",
      "media.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getMediaByMediaKey",
    "method": "GET",
    "path": "/2/media/{media_key}",
    "tags": [
      "Media"
    ],
    "summary": "Get Media by media key",
    "pathParams": [
      "media_key"
    ],
    "queryParams": [
      "media.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getMediaAnalytics",
    "method": "GET",
    "path": "/2/media/analytics",
    "tags": [
      "Media"
    ],
    "summary": "Get Media analytics",
    "pathParams": [],
    "queryParams": [
      "media_keys",
      "start_time",
      "end_time",
      "granularity",
      "media_analytics.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createMediaMetadata",
    "method": "POST",
    "path": "/2/media/metadata",
    "tags": [
      "Media"
    ],
    "summary": "Create Media metadata",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deleteMediaSubtitles",
    "method": "DELETE",
    "path": "/2/media/subtitles",
    "tags": [
      "Media"
    ],
    "summary": "Delete Media subtitles",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "createMediaSubtitles",
    "method": "POST",
    "path": "/2/media/subtitles",
    "tags": [
      "Media"
    ],
    "summary": "Create Media subtitles",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getMediaUploadStatus",
    "method": "GET",
    "path": "/2/media/upload",
    "tags": [
      "Media"
    ],
    "summary": "Get Media upload status",
    "pathParams": [],
    "queryParams": [
      "media_id",
      "command"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "mediaUpload",
    "method": "POST",
    "path": "/2/media/upload",
    "tags": [
      "Media"
    ],
    "summary": "Upload media",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "appendMediaUpload",
    "method": "POST",
    "path": "/2/media/upload/{id}/append",
    "tags": [
      "Media"
    ],
    "summary": "Append Media Upload",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "finalizeMediaUpload",
    "method": "POST",
    "path": "/2/media/upload/{id}/finalize",
    "tags": [
      "Media"
    ],
    "summary": "Finalize Media upload",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "initializeMediaUpload",
    "method": "POST",
    "path": "/2/media/upload/initialize",
    "tags": [
      "Media"
    ],
    "summary": "Initialize media upload",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getNews",
    "method": "GET",
    "path": "/2/news/{id}",
    "tags": [
      "News"
    ],
    "summary": "Get news stories by ID",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "news.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "searchNews",
    "method": "GET",
    "path": "/2/news/search",
    "tags": [
      "News"
    ],
    "summary": "Search News",
    "pathParams": [],
    "queryParams": [
      "query",
      "max_results",
      "max_age_hours",
      "news.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createCommunityNotes",
    "method": "POST",
    "path": "/2/notes",
    "tags": [
      "Community Notes"
    ],
    "summary": "Create Community Notes",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deleteCommunityNotes",
    "method": "DELETE",
    "path": "/2/notes/{id}",
    "tags": [
      "Community Notes"
    ],
    "summary": "Delete a Community Note",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "evaluateCommunityNotes",
    "method": "POST",
    "path": "/2/notes/evaluate",
    "tags": [
      "Community Notes"
    ],
    "summary": "Evaluate Community Notes",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "searchCommunityNotesWritten",
    "method": "GET",
    "path": "/2/notes/search/notes_written",
    "tags": [
      "Community Notes"
    ],
    "summary": "Search Community Notes Written",
    "pathParams": [],
    "queryParams": [
      "test_mode",
      "max_results",
      "pagination_token",
      "note.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "searchEligiblePosts",
    "method": "GET",
    "path": "/2/notes/search/posts_eligible_for_notes",
    "tags": [
      "Community Notes"
    ],
    "summary": "Search Eligible Posts",
    "pathParams": [],
    "queryParams": [
      "test_mode",
      "max_results",
      "pagination_token",
      "post_selection",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getOpenApiSpec",
    "method": "GET",
    "path": "/2/openapi.json",
    "tags": [
      "General"
    ],
    "summary": "Get OpenAPI Spec.",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getSpacesByIds",
    "method": "GET",
    "path": "/2/spaces",
    "tags": [
      "Spaces"
    ],
    "summary": "Get Spaces by IDs",
    "pathParams": [],
    "queryParams": [
      "ids",
      "space.fields",
      "expansions",
      "user.fields",
      "topic.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getSpacesById",
    "method": "GET",
    "path": "/2/spaces/{id}",
    "tags": [
      "Spaces"
    ],
    "summary": "Get Spaces by ID",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "space.fields",
      "expansions",
      "user.fields",
      "topic.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getSpacesBuyers",
    "method": "GET",
    "path": "/2/spaces/{id}/buyers",
    "tags": [
      "Spaces"
    ],
    "summary": "Get Space ticket buyers",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getSpacesPosts",
    "method": "GET",
    "path": "/2/spaces/{id}/tweets",
    "tags": [
      "Spaces"
    ],
    "summary": "Get Space Posts",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getSpacesByCreatorIds",
    "method": "GET",
    "path": "/2/spaces/by/creator_ids",
    "tags": [
      "Spaces"
    ],
    "summary": "Get Spaces by Creator IDs",
    "pathParams": [],
    "queryParams": [
      "user_ids",
      "space.fields",
      "expansions",
      "user.fields",
      "topic.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "searchSpaces",
    "method": "GET",
    "path": "/2/spaces/search",
    "tags": [
      "Spaces"
    ],
    "summary": "Search Spaces",
    "pathParams": [],
    "queryParams": [
      "query",
      "state",
      "max_results",
      "space.fields",
      "expansions",
      "user.fields",
      "topic.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getTrendsByWoeid",
    "method": "GET",
    "path": "/2/trends/by/woeid/{woeid}",
    "tags": [
      "Trends"
    ],
    "summary": "Get Trends by Woeid",
    "pathParams": [
      "woeid"
    ],
    "queryParams": [
      "max_trends",
      "trend.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getPostsByIds",
    "method": "GET",
    "path": "/2/tweets",
    "tags": [
      "Posts"
    ],
    "summary": "Get Posts by IDs",
    "pathParams": [],
    "queryParams": [
      "ids",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createPosts",
    "method": "POST",
    "path": "/2/tweets",
    "tags": [
      "Posts"
    ],
    "summary": "Create Posts",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deletePosts",
    "method": "DELETE",
    "path": "/2/tweets/{id}",
    "tags": [
      "Posts"
    ],
    "summary": "Delete Posts",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getPostsById",
    "method": "GET",
    "path": "/2/tweets/{id}",
    "tags": [
      "Posts"
    ],
    "summary": "Get Posts by ID",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getPostsLikingUsers",
    "method": "GET",
    "path": "/2/tweets/{id}/liking_users",
    "tags": [
      "Posts"
    ],
    "summary": "Get Posts Liking Users",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getPostsQuotedPosts",
    "method": "GET",
    "path": "/2/tweets/{id}/quote_tweets",
    "tags": [
      "Posts"
    ],
    "summary": "Get Posts Quoted Posts",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "exclude",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getPostsRepostedBy",
    "method": "GET",
    "path": "/2/tweets/{id}/retweeted_by",
    "tags": [
      "Posts"
    ],
    "summary": "Get Posts Reposted by",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getPostsReposts",
    "method": "GET",
    "path": "/2/tweets/{id}/retweets",
    "tags": [
      "Posts"
    ],
    "summary": "Get Posts Reposts",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "hidePostsReply",
    "method": "PUT",
    "path": "/2/tweets/{tweet_id}/hidden",
    "tags": [
      "Posts"
    ],
    "summary": "Hide reply",
    "pathParams": [
      "tweet_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getPostsAnalytics",
    "method": "GET",
    "path": "/2/tweets/analytics",
    "tags": [
      "Posts"
    ],
    "summary": "Get Posts Analytics",
    "pathParams": [],
    "queryParams": [
      "ids",
      "start_time",
      "end_time",
      "granularity",
      "analytics.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "streamPostsCompliance",
    "method": "GET",
    "path": "/2/tweets/compliance/stream",
    "tags": [
      "Stream"
    ],
    "summary": "Stream Posts compliance data",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "partition",
      "start_time",
      "end_time"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "getPostsCountsAll",
    "method": "GET",
    "path": "/2/tweets/counts/all",
    "tags": [
      "Posts"
    ],
    "summary": "Get Posts Counts All",
    "pathParams": [],
    "queryParams": [
      "query",
      "start_time",
      "end_time",
      "since_id",
      "until_id",
      "next_token",
      "pagination_token",
      "granularity",
      "search_count.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getPostsCountsRecent",
    "method": "GET",
    "path": "/2/tweets/counts/recent",
    "tags": [
      "Posts"
    ],
    "summary": "Get Posts Counts Recent",
    "pathParams": [],
    "queryParams": [
      "query",
      "start_time",
      "end_time",
      "since_id",
      "until_id",
      "next_token",
      "pagination_token",
      "granularity",
      "search_count.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "streamPostsFirehose",
    "method": "GET",
    "path": "/2/tweets/firehose/stream",
    "tags": [
      "Stream"
    ],
    "summary": "Stream all Posts",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "tweet.fields",
      "expansions",
      "media.fields",
      "poll.fields",
      "user.fields",
      "place.fields",
      "partition",
      "start_time",
      "end_time"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "streamPostsFirehoseEn",
    "method": "GET",
    "path": "/2/tweets/firehose/stream/lang/en",
    "tags": [
      "Stream"
    ],
    "summary": "Stream English Posts",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "tweet.fields",
      "expansions",
      "media.fields",
      "poll.fields",
      "user.fields",
      "place.fields",
      "partition",
      "start_time",
      "end_time"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "streamPostsFirehoseJa",
    "method": "GET",
    "path": "/2/tweets/firehose/stream/lang/ja",
    "tags": [
      "Stream"
    ],
    "summary": "Stream Japanese Posts",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "tweet.fields",
      "expansions",
      "media.fields",
      "poll.fields",
      "user.fields",
      "place.fields",
      "partition",
      "start_time",
      "end_time"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "streamPostsFirehoseKo",
    "method": "GET",
    "path": "/2/tweets/firehose/stream/lang/ko",
    "tags": [
      "Stream"
    ],
    "summary": "Stream Korean Posts",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "tweet.fields",
      "expansions",
      "media.fields",
      "poll.fields",
      "user.fields",
      "place.fields",
      "partition",
      "start_time",
      "end_time"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "streamPostsFirehosePt",
    "method": "GET",
    "path": "/2/tweets/firehose/stream/lang/pt",
    "tags": [
      "Stream"
    ],
    "summary": "Stream Portuguese Posts",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "tweet.fields",
      "expansions",
      "media.fields",
      "poll.fields",
      "user.fields",
      "place.fields",
      "partition",
      "start_time",
      "end_time"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "streamLabelsCompliance",
    "method": "GET",
    "path": "/2/tweets/label/stream",
    "tags": [
      "Stream"
    ],
    "summary": "Stream Post labels",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "start_time",
      "end_time"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "streamPostsSample",
    "method": "GET",
    "path": "/2/tweets/sample/stream",
    "tags": [
      "Stream"
    ],
    "summary": "Stream sampled Posts",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "tweet.fields",
      "expansions",
      "media.fields",
      "poll.fields",
      "user.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "streamPostsSample10",
    "method": "GET",
    "path": "/2/tweets/sample10/stream",
    "tags": [
      "Stream"
    ],
    "summary": "Stream 10% sampled Posts",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "tweet.fields",
      "expansions",
      "media.fields",
      "poll.fields",
      "user.fields",
      "place.fields",
      "partition",
      "start_time",
      "end_time"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "searchPostsAll",
    "method": "GET",
    "path": "/2/tweets/search/all",
    "tags": [
      "Posts"
    ],
    "summary": "Search Posts All",
    "pathParams": [],
    "queryParams": [
      "query",
      "start_time",
      "end_time",
      "since_id",
      "until_id",
      "max_results",
      "next_token",
      "pagination_token",
      "sort_order",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "searchPostsRecent",
    "method": "GET",
    "path": "/2/tweets/search/recent",
    "tags": [
      "Posts"
    ],
    "summary": "Search Posts Recent",
    "pathParams": [],
    "queryParams": [
      "query",
      "max_results",
      "next_token",
      "pagination_token",
      "start_time",
      "end_time",
      "since_id",
      "until_id",
      "sort_order",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "streamPosts",
    "method": "GET",
    "path": "/2/tweets/search/stream",
    "tags": [
      "Stream"
    ],
    "summary": "Stream filtered Posts",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "start_time",
      "end_time",
      "tweet.fields",
      "expansions",
      "media.fields",
      "poll.fields",
      "user.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "getRules",
    "method": "GET",
    "path": "/2/tweets/search/stream/rules",
    "tags": [
      "Stream"
    ],
    "summary": "Get filtered-stream rules",
    "pathParams": [],
    "queryParams": [
      "ids",
      "max_results",
      "pagination_token"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "updateRules",
    "method": "POST",
    "path": "/2/tweets/search/stream/rules",
    "tags": [
      "Stream"
    ],
    "summary": "Update stream rules",
    "pathParams": [],
    "queryParams": [
      "dry_run",
      "delete_all"
    ],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getRuleCounts",
    "method": "GET",
    "path": "/2/tweets/search/stream/rules/counts",
    "tags": [
      "Stream"
    ],
    "summary": "Get Rule Counts",
    "pathParams": [],
    "queryParams": [
      "rules_count.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getWebhooksStreamLinks",
    "method": "GET",
    "path": "/2/tweets/search/webhooks",
    "tags": [
      "Webhooks"
    ],
    "summary": "Get stream links",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "deleteWebhooksStreamLink",
    "method": "DELETE",
    "path": "/2/tweets/search/webhooks/{webhook_id}",
    "tags": [
      "Webhooks"
    ],
    "summary": "Delete stream link",
    "pathParams": [
      "webhook_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "createWebhooksStreamLink",
    "method": "POST",
    "path": "/2/tweets/search/webhooks/{webhook_id}",
    "tags": [
      "Webhooks"
    ],
    "summary": "Create stream link",
    "pathParams": [
      "webhook_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getUsageCredits",
    "method": "GET",
    "path": "/2/usage/credits",
    "tags": [
      "Usage"
    ],
    "summary": "Get usage credits",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsage",
    "method": "GET",
    "path": "/2/usage/tweets",
    "tags": [
      "Usage"
    ],
    "summary": "Get Usage",
    "pathParams": [],
    "queryParams": [
      "days",
      "usage.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersByIds",
    "method": "GET",
    "path": "/2/users",
    "tags": [
      "Users"
    ],
    "summary": "Get Users by IDs",
    "pathParams": [],
    "queryParams": [
      "ids",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersById",
    "method": "GET",
    "path": "/2/users/{id}",
    "tags": [
      "Users"
    ],
    "summary": "Get Users by ID",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersAffiliates",
    "method": "GET",
    "path": "/2/users/{id}/affiliates",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Affiliates",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersBlocking",
    "method": "GET",
    "path": "/2/users/{id}/blocking",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Blocking",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersBookmarks",
    "method": "GET",
    "path": "/2/users/{id}/bookmarks",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Bookmarks",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createUsersBookmark",
    "method": "POST",
    "path": "/2/users/{id}/bookmarks",
    "tags": [
      "Users"
    ],
    "summary": "Create Bookmark",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deleteUsersBookmark",
    "method": "DELETE",
    "path": "/2/users/{id}/bookmarks/{tweet_id}",
    "tags": [
      "Users"
    ],
    "summary": "Delete Bookmark",
    "pathParams": [
      "id",
      "tweet_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getUsersBookmarkFolders",
    "method": "GET",
    "path": "/2/users/{id}/bookmarks/folders",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Bookmark Folders",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createUsersBookmarkFolder",
    "method": "POST",
    "path": "/2/users/{id}/bookmarks/folders",
    "tags": [
      "Users"
    ],
    "summary": "Create Bookmark Folder",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getUsersBookmarksByFolderId",
    "method": "GET",
    "path": "/2/users/{id}/bookmarks/folders/{folder_id}",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Bookmarks by Folder ID",
    "pathParams": [
      "id",
      "folder_id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "blockUsersDms",
    "method": "POST",
    "path": "/2/users/{id}/dm/block",
    "tags": [
      "Users"
    ],
    "summary": "Block Users Dms",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "unblockUsersDms",
    "method": "POST",
    "path": "/2/users/{id}/dm/unblock",
    "tags": [
      "Users"
    ],
    "summary": "Unblock Users Dms",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getUsersFollowedLists",
    "method": "GET",
    "path": "/2/users/{id}/followed_lists",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Followed Lists",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "list.fields",
      "expansions",
      "user.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "followList",
    "method": "POST",
    "path": "/2/users/{id}/followed_lists",
    "tags": [
      "Users"
    ],
    "summary": "Follow List",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "unfollowList",
    "method": "DELETE",
    "path": "/2/users/{id}/followed_lists/{list_id}",
    "tags": [
      "Users"
    ],
    "summary": "Unfollow a List",
    "pathParams": [
      "id",
      "list_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getUsersFollowers",
    "method": "GET",
    "path": "/2/users/{id}/followers",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Followers",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersFollowing",
    "method": "GET",
    "path": "/2/users/{id}/following",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Following",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "followUser",
    "method": "POST",
    "path": "/2/users/{id}/following",
    "tags": [
      "Users"
    ],
    "summary": "Follow User",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getUsersLikedPosts",
    "method": "GET",
    "path": "/2/users/{id}/liked_tweets",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Liked Posts",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "likePost",
    "method": "POST",
    "path": "/2/users/{id}/likes",
    "tags": [
      "Users"
    ],
    "summary": "Like Post",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "unlikePost",
    "method": "DELETE",
    "path": "/2/users/{id}/likes/{tweet_id}",
    "tags": [
      "Users"
    ],
    "summary": "Unlike Post",
    "pathParams": [
      "id",
      "tweet_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getUsersListMemberships",
    "method": "GET",
    "path": "/2/users/{id}/list_memberships",
    "tags": [
      "Users"
    ],
    "summary": "Get Users List Memberships",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "list.fields",
      "expansions",
      "user.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersMentions",
    "method": "GET",
    "path": "/2/users/{id}/mentions",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Mentions",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "start_time",
      "end_time",
      "since_id",
      "until_id",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersMuting",
    "method": "GET",
    "path": "/2/users/{id}/muting",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Muting",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "muteUser",
    "method": "POST",
    "path": "/2/users/{id}/muting",
    "tags": [
      "Users"
    ],
    "summary": "Mute User",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "getUsersOwnedLists",
    "method": "GET",
    "path": "/2/users/{id}/owned_lists",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Owned Lists",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "list.fields",
      "expansions",
      "user.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersPinnedLists",
    "method": "GET",
    "path": "/2/users/{id}/pinned_lists",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Pinned Lists",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "list.fields",
      "expansions",
      "user.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "pinList",
    "method": "POST",
    "path": "/2/users/{id}/pinned_lists",
    "tags": [
      "Users"
    ],
    "summary": "Pin List",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "unpinList",
    "method": "DELETE",
    "path": "/2/users/{id}/pinned_lists/{list_id}",
    "tags": [
      "Users"
    ],
    "summary": "Unpin a List",
    "pathParams": [
      "id",
      "list_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getUsersPublicKey",
    "method": "GET",
    "path": "/2/users/{id}/public_keys",
    "tags": [
      "Users"
    ],
    "summary": "Get public keys",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "public_key.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "addUserPublicKey",
    "method": "POST",
    "path": "/2/users/{id}/public_keys",
    "tags": [
      "Chat"
    ],
    "summary": "Add public key",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "repostPost",
    "method": "POST",
    "path": "/2/users/{id}/retweets",
    "tags": [
      "Users"
    ],
    "summary": "Repost Post",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "unrepostPost",
    "method": "DELETE",
    "path": "/2/users/{id}/retweets/{source_tweet_id}",
    "tags": [
      "Users"
    ],
    "summary": "Unrepost Post",
    "pathParams": [
      "id",
      "source_tweet_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getUsersTimeline",
    "method": "GET",
    "path": "/2/users/{id}/timelines/reverse_chronological",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Timeline",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "start_time",
      "end_time",
      "since_id",
      "until_id",
      "exclude",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersPosts",
    "method": "GET",
    "path": "/2/users/{id}/tweets",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Posts",
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "max_results",
      "pagination_token",
      "start_time",
      "end_time",
      "since_id",
      "until_id",
      "exclude",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "unfollowUser",
    "method": "DELETE",
    "path": "/2/users/{source_user_id}/following/{target_user_id}",
    "tags": [
      "Users"
    ],
    "summary": "Unfollow User",
    "pathParams": [
      "source_user_id",
      "target_user_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "unmuteUser",
    "method": "DELETE",
    "path": "/2/users/{source_user_id}/muting/{target_user_id}",
    "tags": [
      "Users"
    ],
    "summary": "Unmute User",
    "pathParams": [
      "source_user_id",
      "target_user_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "getUsersByUsernames",
    "method": "GET",
    "path": "/2/users/by",
    "tags": [
      "Users"
    ],
    "summary": "Get Users by Usernames",
    "pathParams": [],
    "queryParams": [
      "usernames",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersByUsername",
    "method": "GET",
    "path": "/2/users/by/username/{username}",
    "tags": [
      "Users"
    ],
    "summary": "Get Users by Username",
    "pathParams": [
      "username"
    ],
    "queryParams": [
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "streamUsersCompliance",
    "method": "GET",
    "path": "/2/users/compliance/stream",
    "tags": [
      "Stream"
    ],
    "summary": "Stream Users compliance data",
    "pathParams": [],
    "queryParams": [
      "backfill_minutes",
      "partition",
      "start_time",
      "end_time"
    ],
    "hasBody": false,
    "status": "excluded",
    "reason": "A long-lived HTTP stream, not a request/response endpoint. It never returns, so a tool call pointed at it would hang until the client gave up. Manage the rules here with the /stream/rules operations and consume the stream in a long-running process.",
    "action": "read"
  },
  {
    "id": "getUsersMe",
    "method": "GET",
    "path": "/2/users/me",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Me",
    "pathParams": [],
    "queryParams": [
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getTrendsPersonalizedTrends",
    "method": "GET",
    "path": "/2/users/personalized_trends",
    "tags": [
      "Trends"
    ],
    "summary": "Get Trends Personalized Trends",
    "pathParams": [],
    "queryParams": [
      "personalized_trend.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersPublicKeys",
    "method": "GET",
    "path": "/2/users/public_keys",
    "tags": [
      "Users"
    ],
    "summary": "Get public keys",
    "pathParams": [],
    "queryParams": [
      "ids",
      "public_key.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getUsersRepostsOfMe",
    "method": "GET",
    "path": "/2/users/reposts_of_me",
    "tags": [
      "Users"
    ],
    "summary": "Get Users Reposts of Me",
    "pathParams": [],
    "queryParams": [
      "max_results",
      "pagination_token",
      "post.fields",
      "expansions",
      "user.fields",
      "media.fields",
      "poll.fields",
      "place.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "searchUsers",
    "method": "GET",
    "path": "/2/users/search",
    "tags": [
      "Users"
    ],
    "summary": "Search Users",
    "pathParams": [],
    "queryParams": [
      "query",
      "max_results",
      "next_token",
      "user.fields",
      "expansions",
      "post.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "getWebhooks",
    "method": "GET",
    "path": "/2/webhooks",
    "tags": [
      "Webhooks"
    ],
    "summary": "Get webhook",
    "pathParams": [],
    "queryParams": [
      "webhook_config.fields"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "read"
  },
  {
    "id": "createWebhooks",
    "method": "POST",
    "path": "/2/webhooks",
    "tags": [
      "Webhooks"
    ],
    "summary": "Create webhook",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "deleteWebhooks",
    "method": "DELETE",
    "path": "/2/webhooks/{webhook_id}",
    "tags": [
      "Webhooks"
    ],
    "summary": "Delete webhook",
    "pathParams": [
      "webhook_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "destructive"
  },
  {
    "id": "validateWebhooks",
    "method": "PUT",
    "path": "/2/webhooks/{webhook_id}",
    "tags": [
      "Webhooks"
    ],
    "summary": "Validate webhook",
    "pathParams": [
      "webhook_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  },
  {
    "id": "createWebhookReplayJob",
    "method": "POST",
    "path": "/2/webhooks/replay",
    "tags": [
      "Webhooks"
    ],
    "summary": "Create replay job for webhook",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "x_call",
    "action": "write"
  }
];

export const OPERATIONS_BY_ID = new Map(OPERATIONS.map((o) => [o.id, o]));
