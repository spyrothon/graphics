import { StoreState } from "@graphics/Store";

import { RemoteAction, RemoteActionType } from "./RemoteTypes";

export function remoteConnected(): RemoteAction {
  return {
    type: RemoteActionType.REMOTE_CONNECTED,
  };
}

export function remoteDisconnected(): RemoteAction {
  return {
    type: RemoteActionType.REMOTE_DISCONNECTED,
  };
}

export function exportState(state: StoreState) {
  return {
    type: RemoteActionType.REMOTE_STATE_EXPORT as const,
    state,
    createdAt: Date.now(),
  };
}
