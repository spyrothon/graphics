import { parse } from "query-string";

const { api_base: queryAPIBase, api_version: queryAPIVersion } = parse(window.location.search);

export const API_BASE = queryAPIBase || import.meta.env.VITE_API_BASE;
export const API_VERSION = queryAPIVersion || import.meta.env.VITE_API_VERSION;
export const API_ENDPOINT = `${API_BASE}/${API_VERSION}`;
export const ASSETS_URL = import.meta.env.VITE_ASSETS_ENDPOINT;
// Used for forwarding users from Admin to App e.g., for previewing newsletters/schedules.
export const APP_HOST = import.meta.env.VITE_APP_HOST;

export const SOCKET_SYNC_HOST = import.meta.env.VITE_SYNC_HOST;
export const SOCKET_WEBSOCKET_PROTOCOL = window.location.protocol === "https:" ? "wss" : "ws";
// How long between heartbeats to keep the websocket alive
export const SOCKET_PING_INTERVAL = 25000;
