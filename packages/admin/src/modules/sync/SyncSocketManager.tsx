import { ConnectionChangeHandler, SyncSocket, SyncSocketMessage } from "@spyrothon/api";

import { store } from "../../Store";
import { loadInterview } from "../interviews/InterviewActions";
import { loadRun } from "../runs/RunActions";
import { loadSchedule } from "../schedules/ScheduleActions";

class SyncSocketManager {
  private socket?: SyncSocket;
  private subscribers: Array<ConnectionChangeHandler> = [];

  public isConnected = false;

  init() {
    this.socket = new SyncSocket(this.handleMessage, this.handleConnectionChange);
    this.socket.connect();
  }

  stop() {
    this.socket?.disconnect();
  }

  addConnectionListener(subscription: ConnectionChangeHandler) {
    this.subscribers.push(subscription);
    return () => {
      this.subscribers.filter((sub) => sub !== subscription);
    };
  }

  handleMessage = (message: SyncSocketMessage) => {
    console.log("[SYNC_SOCKET ->]", message);
    switch (message.type) {
      case "load_schedule":
        store.dispatch(loadSchedule(message.schedule));
        return;
      case "load_run":
        store.dispatch(loadRun(message.run));
        return;
      case "load_interview":
        store.dispatch(loadInterview(message.interview));
    }
  };

  handleConnectionChange = (connected: boolean) => {
    this.isConnected = connected;
    for (const subscriber of this.subscribers) {
      subscriber(this.isConnected);
    }
  };

  send(message: SyncSocketMessage) {
    console.log("[SYNC_SOCKET <-]", message);
    this.socket?.send(message);
  }
}

export default new SyncSocketManager();
