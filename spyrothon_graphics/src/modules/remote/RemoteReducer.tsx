import { Action, ActionFor } from "@graphics/Actions";

import { RemoteActionType } from "./RemoteTypes";

type RemoteReducerState = {
  connected: boolean;
};

function handleConnected(
  state: RemoteReducerState,
  _action: ActionFor<RemoteActionType.REMOTE_CONNECTED>,
) {
  return {
    ...state,
    connected: true,
  };
}

function handleDisconnected(
  state: RemoteReducerState,
  _action: ActionFor<RemoteActionType.REMOTE_DISCONNECTED>,
) {
  return {
    ...state,
    connected: false,
  };
}

const defaultState = {
  connected: false,
};

export default function remoteReducer(state: RemoteReducerState = defaultState, action: Action) {
  switch (action.type) {
    case RemoteActionType.REMOTE_CONNECTED:
      return handleConnected(state, action);
    case RemoteActionType.REMOTE_DISCONNECTED:
      return handleDisconnected(state, action);
  }

  return state;
}
