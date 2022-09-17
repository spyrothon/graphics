import SturdyWebSocket from "sturdy-websocket";

import { Action, ActionFor } from "@graphics/Actions";
import { Store } from "@graphics/Store";

import { remoteConnected, remoteDisconnected } from "./RemoteActions";
import { REMOTE_SOCKET_PING_INTERVAL } from "./RemoteConstants";
import { RemoteActionType } from "./RemoteTypes";

export default class ActionReceiver {
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

  ping = () => this.socket?.send("ping");
  handleOpen = () => this.store.dispatch(remoteConnected());
  handleReopen = () => this.store.dispatch(remoteConnected());
  handleDown = () => this.store.dispatch(remoteDisconnected());
  handleClose = () => this.store.dispatch(remoteDisconnected());
  handleError(_event: Event) {}

  handleMessage = (event: MessageEvent) => {
    // Naive cast because MessageEvent _could_ be ArrayBuffer, but isn't for this usage.
    const data = event.data as string;
    try {
      // TODO: This needs a lot more validation
      const action: Action = JSON.parse(data);
      this.store.dispatch(action);
    } catch (e) {
      console.warn("[REMOTE] received message that could not be processed: ", e);
    }
  };

  send(action: ActionFor<RemoteActionType.REMOTE_STATE_EXPORT>) {
    this.socket?.send(JSON.stringify(action));
  }
}
