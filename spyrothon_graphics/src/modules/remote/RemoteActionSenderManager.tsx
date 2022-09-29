import { Action } from "@graphics/Actions";
import { store } from "@graphics/Store";

import ActionSender from "./ActionSender";
import { REMOTE_SYNC_HOST, REMOTE_WEBSOCKET_PROTOCOL } from "./RemoteConstants";

class RemoteActionSenderManager {
  private sender: ActionSender | undefined;

  init() {
    const socketURL = `${REMOTE_WEBSOCKET_PROTOCOL}:${REMOTE_SYNC_HOST}/`;
    this.sender = new ActionSender(store, socketURL);
    this.sender.connect();
  }

  send(action: Action) {
    this.sender?.send(action);
  }
}

export default new RemoteActionSenderManager();
