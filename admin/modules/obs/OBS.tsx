import OBSWebSocket from "obs-websocket-js";

import { OBSWebsocketConfig, Transition } from "../../../api/APITypes";
import OBSEventQueue from "./OBSEventQueue";
import {
  setOBSConnected,
  setOBSFailed,
  setSceneList,
  setTransitionList,
  setOBSBusy,
} from "./OBSStore";
import { OBSCustomEvent, OBSCustomEventTypes } from "./OBSTypes";

const obs = new OBSWebSocket();

obs.on("ConnectionOpened", () => setOBSConnected(true));
obs.on("ConnectionClosed", () => setOBSConnected(false));
obs.on("error", console.error);
obs.on("BroadcastCustomMessage", handleCustomMessage);

function handleCustomMessage({ data }: { data: {} }) {
  const message = data as OBSCustomEvent;
  switch (message.type) {
    case OBSCustomEventTypes.TRANSITION_SEQUENCE_STARTED:
      setOBSBusy(true, message.originator);
      break;
    case OBSCustomEventTypes.TRANSITION_SEQUENCE_ENDED:
      setOBSBusy(false, message.originator);
      break;
  }
}

class OBS {
  private eventQueue: OBSEventQueue;

  constructor() {
    this.eventQueue = new OBSEventQueue(obs);
  }

  async connect(config: OBSWebsocketConfig) {
    await obs
      .connect({
        address: `${config.host}:${config.port}`,
        password: config.password,
      })
      .then(() => {
        this._preload();
      })
      .catch(() => setOBSFailed());

    return this;
  }

  _preload() {
    this.getScenes().then((response) => setSceneList(response.scenes));
    this.getTransitions().then((response) => setTransitionList(response.transitions));
  }

  async disconnect() {
    obs.disconnect();
    return this;
  }

  getScenes() {
    return obs.send("GetSceneList");
  }

  setScene(sceneName: string) {
    return obs.send("SetPreviewScene", { "scene-name": sceneName });
  }

  getTransitions() {
    return obs.send("GetTransitionList");
  }

  async executeTransition(transition: Transition) {
    const { sceneDuration, obsMediaSourceName, obsSceneName, obsTransitionInName } = transition;
    let waitTime = sceneDuration ?? 0;
    if (waitTime === 0 && obsMediaSourceName != null) {
      const { mediaDuration } = await obs.send("GetMediaDuration", {
        sourceName: obsMediaSourceName,
      });
      waitTime = mediaDuration + 100;
    }

    await obs.send("SetPreviewScene", { "scene-name": obsSceneName });
    return new Promise((resolve) => {
      this.eventQueue.onNext("TransitionEnd").then(() => setTimeout(resolve, waitTime));
      obs.send("TransitionToProgram", {
        "with-transition": { name: obsTransitionInName },
      });
    });
  }

  async executeTransitionSet(transitions: Transition[]) {
    await this.broadcast({ type: OBSCustomEventTypes.TRANSITION_SEQUENCE_STARTED });
    for (const transition of transitions) {
      await this.executeTransition(transition);
    }
    await this.broadcast({ type: OBSCustomEventTypes.TRANSITION_SEQUENCE_ENDED });
  }

  async broadcast(message: OBSCustomEvent) {
    obs.send("BroadcastCustomMessage", { realm: "admin", data: message });
  }
}

export default new OBS();