import { store } from "@graphics/Store";

import ActionReceiver from "./ActionReceiver";
import { exportState } from "./RemoteActions";
import {
  REMOTE_SYNC_HOST,
  REMOTE_SYNC_INTERVAL,
  REMOTE_WEBSOCKET_PROTOCOL,
} from "./RemoteConstants";

class RemoteActionReceiverManager {
  private receiver?: ActionReceiver;
  private intervalId?: number;

  init() {
    const socketURL = `${REMOTE_WEBSOCKET_PROTOCOL}:${REMOTE_SYNC_HOST}/`;
    this.receiver = new ActionReceiver(store, socketURL);
    this.receiver.connect();

    this.intervalId = window.setInterval(() => this.syncState(), REMOTE_SYNC_INTERVAL);
  }

  stop() {
    if (this.intervalId == null) return;
    window.clearInterval(this.intervalId);
  }

  syncState() {
    this.receiver?.send(exportState(store.getState()));
  }
}

export default new RemoteActionReceiverManager();
