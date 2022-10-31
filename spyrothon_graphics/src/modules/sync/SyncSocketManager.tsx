import { SyncSocket, SyncSocketMessage } from "@spyrothon/api";

import { store } from "@graphics/Store";

import { loadInterview } from "../interviews/InterviewActions";
import { loadParticipants } from "../participants/ParticipantStore";
import { loadRun } from "../runs/RunActions";
import { loadSchedule } from "../schedules/ScheduleActions";

class SyncSocketManager {
  private socket?: SyncSocket;

  init() {
    this.socket = new SyncSocket(this.handleMessage, () => null);
    this.socket.connect();
  }

  stop() {
    this.socket?.disconnect();
  }

  handleMessage = (message: SyncSocketMessage) => {
    console.log("received from socket", message);
    switch (message.type) {
      case "load_schedule":
        store.dispatch(loadSchedule(message.schedule));
        return;
      case "load_run":
        store.dispatch(loadRun(message.run));
        return;
      case "load_interview":
        store.dispatch(loadInterview(message.interview));
        return;
      case "load_participant":
        loadParticipants([message.participant]);
        return;
    }
  };
}

export default new SyncSocketManager();
