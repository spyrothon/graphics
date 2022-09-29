import create from "zustand";

import type { OBSInput, OBSInputState, OBSScene, OBSSceneItem, OBSTransition } from "./OBSTypes";

interface OBSStoreState {
  connected: boolean;
  failed: boolean;
  sceneList: OBSScene[];
  transitionList: OBSTransition[];
  inputList: OBSInput[];
  busy: {
    busy: boolean;
    originator?: string;
  };
  data: {
    sceneList: OBSScene[];
    transitionList: OBSTransition[];
    inputList: OBSInput[];
    sceneItems: Record<OBSSceneItem["sceneItemId"], OBSSceneItem>;
    inputStates: Record<OBSInput["inputName"], Partial<OBSInputState>>;
    currentProgramSceneName?: string;
    currentPreviewSceneName?: string;
    transitionInProgress: boolean;
    streaming: boolean;
  };
  meters: {};
}

export const useOBSStore = create<OBSStoreState>((_set) => ({
  connected: false,
  failed: false,
  busy: { busy: false },
  sceneList: [],
  transitionList: [],
  inputList: [],
  data: {
    sceneList: [],
    transitionList: [],
    inputList: [],
    sceneItems: {},
    inputStates: {},
    currentProgramSceneName: undefined,
    currentPreviewSceneName: undefined,
    transitionInProgress: false,
    streaming: false,
  },
  meters: {},
}));

export function setOBSConnected(connected: boolean) {
  useOBSStore.setState((state) => ({ connected, failed: connected ? false : state.failed }));
}

export function setOBSFailed() {
  useOBSStore.setState({ connected: false, failed: true });
}

export function setOBSBusy(busy: boolean, originator?: string) {
  useOBSStore.setState({ busy: { busy, originator } });
}

export function useOBSConnected() {
  return useOBSStore((state) => [state.connected, state.failed]);
}

export function useOBSBusy() {
  return useOBSStore((state) => state.busy);
}

export function setOBSData(
  data:
    | Partial<OBSStoreState["data"]>
    | ((data: OBSStoreState["data"]) => Partial<OBSStoreState["data"]>),
) {
  return useOBSStore.setState((state) => ({
    data: { ...state.data, ...(typeof data === "function" ? data(state.data) : data) },
  }));
}

export function setSceneList(sceneList: OBSScene[]) {
  useOBSStore.setState({ sceneList });
}

export function setInputList(inputList: OBSInput[]) {
  useOBSStore.setState({ inputList });
}

export function setTransitionList(transitionList: OBSTransition[]) {
  useOBSStore.setState({ transitionList });
}
