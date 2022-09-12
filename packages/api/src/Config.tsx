import { parse } from "query-string";

const { api_base: queryAPIBase, api_version: queryAPIVersion } = parse(window.location.search);

export const API_BASE = queryAPIBase || __API_BASE__;
export const API_VERSION = queryAPIVersion || __API_VERSION__;
export const API_ENDPOINT = `${API_BASE}/${API_VERSION}`;
export const ASSETS_URL = __ASSETS_ENDPOINT__;
// Used for forwarding users from Admin to App e.g., for previewing newsletters/schedules.
export const APP_HOST = __APP_HOST__;

export const SOCKET_SYNC_HOST = __SYNC_HOST__;
export const SOCKET_WEBSOCKET_PROTOCOL = window.location.protocol === "https:" ? "wss" : "ws";
// How long between heartbeats to keep the websocket alive
export const SOCKET_PING_INTERVAL = 25000;
