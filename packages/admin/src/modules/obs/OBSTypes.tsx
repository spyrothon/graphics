export interface OBSTransition {
  transitionConfigurable: boolean;
  transitionFixed: boolean;
  transitionKind: string;
  transitionName: string;
}

export interface OBSScene {
  sceneIndex: number;
  sceneName: string;
}

export interface OBSInput {
  inputKind: string;
  inputName: string;
  unversionedInputKind: string;
}

export interface OBSInputState {
  inputVolumeMul?: number;
  inputVolumeDb?: number;
  inputMuted?: boolean;
  videoActive?: boolean;
  videoShowing?: boolean;
  inputAudioSyncOffset?: number;
  playbackInProgress?: boolean;
  inputSettings?: Record<string, any>;
}

export interface OBSSceneItem {
  sceneItemId: number;
  sceneName: string;
  sourceName: string;
  sceneItemIndex: number;
  sceneItemLocked: boolean;
  sceneItemEnabled: boolean;
}

export enum OBSCustomEventTypes {
  TRANSITION_SEQUENCE_STARTED = "transition_sequence_started",
  TRANSITION_SEQUENCE_ENDED = "transition_sequence_ended",
}

export interface OBSCustomEvent {
  type: OBSCustomEventTypes;
  originator?: string;
}

export interface TransitionSequenceStarted extends OBSCustomEvent {
  type: OBSCustomEventTypes.TRANSITION_SEQUENCE_STARTED;
}

export interface TransitionSequenceEnded extends OBSCustomEvent {
  type: OBSCustomEventTypes.TRANSITION_SEQUENCE_ENDED;
}
