import * as snakecaseKeys from "snakecase-keys";
import SturdyWebSocket from "sturdy-websocket";

import { SOCKET_PING_INTERVAL, SOCKET_SYNC_HOST, SOCKET_WEBSOCKET_PROTOCOL } from "../Config";
import { camelizeJSON } from "../JSONUtils";
import type { SyncSocketMessage } from "./SyncSocketTypes";

type MessageHandler = (message: SyncSocketMessage) => unknown;
export type ConnectionChangeHandler = (connected: boolean) => unknown;

export default class SyncSocket {
  private socket?: SturdyWebSocket;
  private host: string;

  constructor(
    private onMessage: MessageHandler,
    private onConnectionChange: ConnectionChangeHandler,
  ) {
    this.host = `${SOCKET_WEBSOCKET_PROTOCOL}://${SOCKET_SYNC_HOST}`;
  }

  connect() {
    this.socket = new SturdyWebSocket(this.host);
    this.socket.onopen = this.handleOpen;
    this.socket.onclose = this.handleClose;
    this.socket.onreopen = this.handleReopen;
    this.socket.ondown = this.handleDown;
    this.socket.onmessage = this.handleMessage;
    this.socket.onerror = this.handleError;

    setInterval(this.ping, SOCKET_PING_INTERVAL);
  }

  disconnect = () => this.socket?.close();

  send = (message: SyncSocketMessage) => {
    this.socket?.send(JSON.stringify(snakecaseKeys(message)));
  };

  ping = () => this.send({ type: "ping" });
  handleError = () => {};
  handleOpen = () => this.onConnectionChange(true);
  handleClose = () => this.onConnectionChange(false);
  handleReopen = () => this.onConnectionChange(true);
  handleDown = () => this.onConnectionChange(false);

  handleMessage = (event: MessageEvent) => {
    const data = camelizeJSON<SyncSocketMessage>(JSON.parse(event.data));
    this.onMessage(data);
  };
}
