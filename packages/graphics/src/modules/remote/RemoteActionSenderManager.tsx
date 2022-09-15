import { Action } from "@graphics/Actions";
import { store } from "@graphics/Store";
import { REMOTE_WEBSOCKET_PROTOCOL, REMOTE_SYNC_HOST } from "./RemoteConstants";
import ActionSender from "./ActionSender";

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
