import { store } from "../../Store";
import * as ScheduleStore from "../schedules/ScheduleStore";
import OBS from "./OBS";

import type { OBSWebsocketConfig } from "@spyrothon/api";

// How frequently to re-synchronize stateful data from OBS. We listen for
// state changes over the socket, but in case the socket disconnects or an
// event is missed, this sync ensures things don't get _too_ far out of date.
const OBS_SYNC_INTERVAL = 2 * 60 * 1000; // 2 minutes

let syncIntervalId: number | undefined;

export default {
  init() {
    let prevConfig: OBSWebsocketConfig | undefined;

    store.subscribe(() => {
      const state = store.getState();
      const config = ScheduleStore.getOBSConfig(state);
      if (config !== prevConfig && config != null) {
        OBS.connect(config);
        clearInterval(syncIntervalId);
        syncIntervalId = setInterval((() => OBS.synchronize()) as Function, OBS_SYNC_INTERVAL);
      }
      prevConfig = config;
    });
  },

  destroy() {
    OBS.disconnect();
    clearInterval(syncIntervalId);
  },
};
