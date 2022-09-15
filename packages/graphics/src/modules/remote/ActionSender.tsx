import SturdyWebSocket from "sturdy-websocket";

import { Action } from "@graphics/Actions";
import { Store } from "@graphics/Store";
import { remoteConnected, remoteDisconnected } from "./RemoteActions";
import { REMOTE_SOCKET_PING_INTERVAL } from "./RemoteConstants";

export default class ActionSender {
  private socket?: SturdyWebSocket;

  constructor(private store: Store, private host: string) {}

  connect() {
    this.socket = new SturdyWebSocket(this.host);
    this.socket.onopen = this.handleOpen;
    this.socket.onreopen = this.handleReopen;
    this.socket.onmessage = this.handleMessage;
    this.socket.onerror = this.handleError;
    this.socket.ondown = this.handleDown;
    this.socket.onclose = this.handleClose;
    setInterval(this.ping, REMOTE_SOCKET_PING_INTERVAL);
  }

  send(action: Action) {
    this.socket?.send(JSON.stringify(action));
  }

  ping = () => this.socket?.send("ping");
  handleOpen = () => this.store.dispatch(remoteConnected());
  handleReopen = () => this.store.dispatch(remoteConnected());
  handleDown = () => this.store.dispatch(remoteDisconnected());
  handleClose = () => this.store.dispatch(remoteDisconnected());
  handleError(_event: Event) {}
  handleMessage(_event: MessageEvent) {}
}
