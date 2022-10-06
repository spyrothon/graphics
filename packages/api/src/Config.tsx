import { parse } from "query-string";

const hasWindow = typeof window !== "undefined";

const { api_base: queryAPIBase, api_version: queryAPIVersion } = parse(
  hasWindow ? window.location.search : "",
);

export const API_BASE = queryAPIBase || import.meta.env.SPYROTHON_API_BASE;
export const API_VERSION = queryAPIVersion || import.meta.env.SPYROTHON_API_VERSION;
export const API_ENDPOINT = `${API_BASE}/${API_VERSION}`;
// Used for forwarding users from Admin to App e.g., for previewing newsletters/schedules.
export const APP_HOST = import.meta.env.SPYROTHON_APP_HOST;

export const SOCKET_SYNC_HOST = import.meta.env.SPYROTHON_SYNC_HOST;
export const SOCKET_WEBSOCKET_PROTOCOL = hasWindow
  ? window.location.protocol === "https:"
    ? "wss"
    : "ws"
  : "wss";
// How long between heartbeats to keep the websocket alive
export const SOCKET_PING_INTERVAL = 25000;
