import OBSWebSocket, {
  OBSRequestTypes,
  OBSResponseTypes,
  RequestBatchRequest,
} from "obs-websocket-js";

import { CropTransform, OBSWebsocketConfig, Transition, TransitionSet } from "@spyrothon/api";
import SyncSocketManager from "../sync/SyncSocketManager";
import { setOBSConnected, setOBSFailed, setOBSBusy, setOBSData } from "./OBSStore";
import {
  OBSCustomEvent,
  OBSCustomEventTypes,
  OBSInput,
  OBSInputState,
  OBSScene,
  OBSTransition,
} from "./OBSTypes";

const obs = new OBSWebSocket();

obs.on("Identified", () => setOBSConnected(true));
obs.on("ConnectionClosed", () => setOBSConnected(false));

// @ts-expect-error CustomEvent isn't known in 5.0.0, but it does still work apparently
obs.on("CustomEvent", handleCustomMessage);
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
  async connect(config: OBSWebsocketConfig) {
    await obs
      .connect(`${config.host}:${config.port}`, config.password)
      .then(() => this.synchronize())
      .then(() => this.subscribeToEvents())
      .catch(() => setOBSFailed());

    return this;
  }

  async synchronize() {
    const { currentProgramSceneName, currentPreviewSceneName, scenes } = await this.getScenes();
    const transitions = await this.getTransitions();
    const inputs = await this.getInputs();
    const inputStates = await this.getInputStates(inputs.map((input) => input.inputName));
    console.log(inputStates);
    setOBSData({
      sceneList: (scenes as unknown) as OBSScene[],
      transitionList: transitions,
      inputList: inputs,
      inputStates,
      currentProgramSceneName,
      currentPreviewSceneName,
    });
  }

  subscribeToEvents() {
    obs.on("CurrentPreviewSceneChanged", ({ sceneName }) =>
      setOBSData({ currentPreviewSceneName: sceneName }),
    );
    obs.on("CurrentProgramSceneChanged", ({ sceneName }) =>
      setOBSData({ currentProgramSceneName: sceneName }),
    );
    obs.on("SceneTransitionStarted", () => setOBSData({ transitionInProgress: true }));
    obs.on("SceneTransitionEnded", () => setOBSData({ transitionInProgress: false }));
    obs.on("StreamStateChanged", ({ outputActive }) => setOBSData({ streaming: outputActive }));
    obs.on("SceneItemLockStateChanged", ({ sceneItemId, sceneItemLocked }) =>
      setOBSData((state) => ({
        sceneItems: {
          ...state.sceneItems,
          [sceneItemId]: { ...state.sceneItems[sceneItemId], sceneItemLocked },
        },
      })),
    );
    obs.on("SceneItemEnableStateChanged", ({ sceneItemId, sceneItemEnabled }) =>
      setOBSData((data) => ({
        sceneItems: {
          ...data.sceneItems,
          [sceneItemId]: { ...data.sceneItems[sceneItemId], sceneItemEnabled },
        },
      })),
    );
    obs.on("MediaInputPlaybackStarted", ({ inputName }) =>
      setOBSData((data) => ({
        inputStates: {
          ...data.inputStates,
          [inputName]: { ...data.inputStates[inputName], playbackInProgress: true },
        },
      })),
    );
    obs.on("MediaInputPlaybackEnded", ({ inputName }) =>
      setOBSData((data) => ({
        inputStates: {
          ...data.inputStates,
          [inputName]: { ...data.inputStates[inputName], playbackInProgress: false },
        },
      })),
    );
    obs.on("InputVolumeChanged", ({ inputName, inputVolumeMul, inputVolumeDb }) =>
      setOBSData((data) => ({
        inputStates: {
          ...data.inputStates,
          [inputName]: { ...data.inputStates[inputName], inputVolumeDb, inputVolumeMul },
        },
      })),
    );
    obs.on("InputMuteStateChanged", ({ inputName, inputMuted }) =>
      setOBSData((data) => ({
        inputStates: {
          ...data.inputStates,
          [inputName]: { ...data.inputStates[inputName], inputMuted },
        },
      })),
    );
    obs.on("InputActiveStateChanged", ({ inputName, videoActive }) =>
      setOBSData((data) => ({
        inputStates: {
          ...data.inputStates,
          [inputName]: { ...data.inputStates[inputName], videoActive },
        },
      })),
    );
    obs.on("InputShowStateChanged", ({ inputName, videoShowing }) =>
      setOBSData((data) => ({
        inputStates: {
          ...data.inputStates,
          [inputName]: { ...data.inputStates[inputName], videoShowing },
        },
      })),
    );
  }

  async disconnect() {
    obs.disconnect();
    return this;
  }

  setScene(sceneName: string) {
    return obs.call("SetCurrentProgramScene", { sceneName });
  }

  async getScenes() {
    const response = await obs.call("GetSceneList");
    return response;
  }

  async getInputs() {
    const response = await obs.call("GetInputList");
    return (response.inputs as unknown) as OBSInput[];
  }

  async getInputStates(inputNames: string[]) {
    const batch: RequestBatchRequest[] = [];
    // This is very fragile and order-dependent. OBS Websocket should really
    // support this natively.
    const requests: Array<keyof OBSRequestTypes> = [
      "GetInputVolume",
      "GetInputMute",
      "GetInputAudioSyncOffset",
      "GetMediaInputStatus",
      "GetSourceActive",
    ];
    for (const inputName of inputNames) {
      const inputRequests = requests.map((requestType) => ({
        requestType,
        requestId: `${inputName}:${requestType}`,
        requestData: requestType === "GetSourceActive" ? { sourceName: inputName } : { inputName },
      }));
      // @ts-expect-error These are formulated correctly, just typing is weird with generics.
      batch.push(...inputRequests);
    }

    const results = await obs.callBatch(batch, {});
    const states: Record<OBSInput["inputName"], OBSInputState> = {};

    for (const response of results) {
      const [inputName, requestType] = response.requestId.split(":");
      const data: Record<string, any> = {};
      switch (requestType) {
        case "GetInputVolume": {
          const res = response.responseData as OBSResponseTypes["GetInputVolume"];
          data["inputVolumeMul"] = res.inputVolumeMul;
          data["inputVolumeDb"] = res.inputVolumeDb;
          break;
        }
        case "GetInputMute": {
          const res = response.responseData as OBSResponseTypes["GetInputMute"];
          data["inputMuted"] = res.inputMuted;
          break;
        }
        case "GetInputAudioSyncOffset": {
          const res = response.responseData as OBSResponseTypes["GetInputAudioSyncOffset"];
          data["inputAudioSyncOffset"] = res.inputAudioSyncOffset;
          break;
        }
        case "GetMediaInputStatus": {
          const res = response.responseData as OBSResponseTypes["GetMediaInputStatus"];
          data["playbackInProgress"] = res.mediaState === "OBS_MEDIA_STATE_PLAYING";
          break;
        }
        case "GetSourceActive": {
          const res = response.responseData as OBSResponseTypes["GetSourceActive"];
          data["videoActive"] = res.videoActive;
          data["videoShowing"] = res.videoShowing;
          break;
        }
      }
      states[inputName] = { ...states[inputName], ...data };
    }

    return states;
  }

  async getTransitions() {
    const response = await obs.call("GetSceneTransitionList");
    return (response.transitions as unknown) as OBSTransition[];
  }

  async getCurrentProgramScene() {
    const response = await obs.call("GetCurrentProgramScene");
    return response.currentProgramSceneName;
  }

  async getCurrentPreviewScene() {
    const response = await obs.call("GetCurrentPreviewScene");
    return response.currentPreviewSceneName;
  }

  /**
   * Gets the total duration of the given media input in milliseconds.
   * Makes a best-effort not to disrupt the existing state of things, but
   * will have to force the input to the playing state and back, because the
   * websocket protocol won't return the duration otherwise.
   */
  async getMediaInputDuration(inputName: string): Promise<number> {
    const { mediaState, mediaDuration } = await obs.call("GetMediaInputStatus", {
      inputName,
    });
    // Not a media source, so it has no duration
    if (mediaState === "OBS_MEDIA_STATE_NONE") return 0;
    // We got the duration, so call it there.
    if (mediaDuration != null) return mediaDuration;

    const resetAction = ((state) => {
      switch (state) {
        case "OBS_MEDIA_STATE_PLAYING":
        case "OBS_MEDIA_STATE_STARTED":
        case "OBS_MEDIA_STATE_STARTING":
        case "OBS_MEDIA_STATE_RESUMED":
          return "OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY";
        case "OBS_MEDIA_STATE_PAUSED":
          return "OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PAUSE";
        case "OBS_MEDIA_STATE_STOPPED":
        case "OBS_MEDIA_STATE_STOPPING":
        default:
          return "OBS_WEBSOCKET_MEDIA_INPUT_ACTION_STOP";
      }
    })(mediaState);

    // Fallback to forcing the input to play, getting the status,
    // resetting the state, and resetting the cursor.
    const [, status] = await obs.callBatch(
      [
        {
          requestType: "TriggerMediaInputAction",
          requestData: { inputName, mediaAction: "OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY" },
        },
        {
          requestType: "GetMediaInputStatus",
          requestData: { inputName },
        },
        {
          requestType: "TriggerMediaInputAction",
          requestData: { inputName, mediaAction: resetAction },
        },
      ],
      {},
    );

    return (status.responseData as OBSResponseTypes["GetMediaInputStatus"]).mediaDuration;
  }

  async executeTransition(transition: Transition) {
    const {
      sceneDuration,
      obsMediaSourceName,
      obsSceneName,
      obsTransitionInName,
      transitionDuration,
    } = transition;
    let waitTime = sceneDuration ?? 100;
    if (obsMediaSourceName != null) {
      waitTime = (await this.getMediaInputDuration(obsMediaSourceName)) + 20;
    }

    const requests: RequestBatchRequest[] = [
      {
        requestType: "SetCurrentPreviewScene",
        requestData: { sceneName: obsSceneName },
      },
      {
        requestType: "SetCurrentSceneTransition",
        requestData: { transitionName: obsTransitionInName },
      },
      {
        requestType: "SetCurrentSceneTransitionDuration",
        requestData: { transitionDuration: transitionDuration ?? 50 },
      },
      // This is a safety net, because for some reason without a delay OBS
      // might start transitioning to the _previous_ Preview scene.
      {
        requestType: "Sleep",
        // @ts-expect-error sleep is either frames or millis, not both
        requestData: { sleepMillis: 100 },
      },
      {
        requestType: "TriggerStudioModeTransition",
        requestData: undefined as never,
      },
      {
        requestType: "Sleep",
        // @ts-expect-error sleep is either frames or millis, not both
        requestData: { sleepMillis: waitTime },
      },
    ];

    return obs.callBatch(requests, {});
  }

  async executeTransitionSet(transitionSet: TransitionSet) {
    // This is specifically not a single RequestBatch because we want to send
    // our own progress updates in the middle of things, which batches don't
    // currently support.
    await this.broadcast({ type: OBSCustomEventTypes.TRANSITION_SEQUENCE_STARTED });
    for (const transition of transitionSet.transitions) {
      SyncSocketManager.send({
        type: "obs_transition_started",
        setId: transitionSet.id,
        transitionId: transition.id,
      });
      await this.executeTransition(transition);
      SyncSocketManager.send({
        type: "obs_transition_finished",
        setId: transitionSet.id,
        transitionId: transition.id,
      });
    }
    await this.broadcast({ type: OBSCustomEventTypes.TRANSITION_SEQUENCE_ENDED });
  }

  async setTransform(
    sceneName: string,
    sceneItemId: number,
    transform: { top: number; right: number; bottom: number; left: number },
  ) {
    await obs.call("SetSceneItemTransform", {
      sceneName,
      sceneItemId,
      sceneItemTransform: transform,
    });
  }

  async setPreviewScene(sceneName: string) {
    await obs.call("SetCurrentPreviewScene", { sceneName });
  }

  /**
   * A break-glass utility for forcing the current scene to transition. Useful
   * if you need to manually force a transition that isn't programmed.
   */
  async transitionToProgram() {
    await obs.call("TriggerStudioModeTransition");
  }

  async setInputVolume(inputName: string, inputVolumeDb: number) {
    await obs.call("SetInputVolume", { inputName, inputVolumeDb });
  }

  async broadcast(message: OBSCustomEvent) {
    obs.call("BroadcastCustomEvent", { eventData: { ...message } });
  }
}

export default new OBS();
