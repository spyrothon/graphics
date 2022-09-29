export const REMOTE_SYNC_HOST = process.env.SYNC_HOST;
export const REMOTE_WEBSOCKET_PROTOCOL = window.location.protocol === "https:" ? "wss" : "ws";
// How long between heartbeats to keep the websocket alive
export const REMOTE_SOCKET_PING_INTERVAL = 25000;

// How long between sending snapshots of the app state over the socket
export const REMOTE_SYNC_INTERVAL = 5000;
