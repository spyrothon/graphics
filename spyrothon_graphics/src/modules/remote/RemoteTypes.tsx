import { StoreState } from "@graphics/Store";

export enum RemoteActionType {
  REMOTE_CONNECTED = "REMOTE_CONNECTED",
  REMOTE_DISCONNECTED = "REMOTE_DISCONNECTED",
  REMOTE_STATE_EXPORT = "REMOTE_STATE_EXPORT",
}

export type RemoteAction =
  | {
      type: RemoteActionType.REMOTE_CONNECTED;
    }
  | {
      type: RemoteActionType.REMOTE_DISCONNECTED;
    }
  | {
      type: RemoteActionType.REMOTE_STATE_EXPORT;
      state: StoreState;
      createdAt: number;
    };
