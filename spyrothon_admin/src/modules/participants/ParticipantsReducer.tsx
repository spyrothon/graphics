import { Participant } from "@spyrothon/api";

import { Action, ActionFor } from "../../Actions";
import { ParticipantActionType } from "./ParticipantTypes";

type ParticipantMap = { [id: string]: Participant };

type ParticipantReducerState = {
  fetching: boolean;
  participants: ParticipantMap;
};

function handleUpdateParticipant(
  state: ParticipantReducerState,
  action: ActionFor<ParticipantActionType.PARTICIPANTS_UPDATE_PARTICIPANT>,
) {
  const { participant } = action;

  return {
    ...state,
    participants: {
      ...state.participants,
      [participant.id]: participant,
    },
  };
}

function handleFetchParticipantsStarted(
  state: ParticipantReducerState,
  _action: ActionFor<ParticipantActionType.PARTICIPANTS_FETCH_PARTICIPANTS_STARTED>,
) {
  return {
    ...state,
    fetching: true,
  };
}

function handleFetchParticipantsSuccess(
  state: ParticipantReducerState,
  action: ActionFor<ParticipantActionType.PARTICIPANTS_FETCH_PARTICIPANTS_SUCCESS>,
) {
  const { participants } = action;
  const participantsById = participants.reduce<ParticipantMap>((acc, participant) => {
    acc[participant.id] = participant;
    return acc;
  }, {});

  return {
    ...state,
    fetching: false,
    participants: { ...state.participants, ...participantsById },
  };
}

const defaultState: ParticipantReducerState = {
  fetching: false,
  participants: {},
};

export default function participantsReducer(
  state: ParticipantReducerState = defaultState,
  action: Action,
): ParticipantReducerState {
  switch (action.type) {
    case ParticipantActionType.PARTICIPANTS_UPDATE_PARTICIPANT:
      return handleUpdateParticipant(state, action);
    case ParticipantActionType.PARTICIPANTS_FETCH_PARTICIPANTS_STARTED:
      return handleFetchParticipantsStarted(state, action);
    case ParticipantActionType.PARTICIPANTS_FETCH_PARTICIPANTS_SUCCESS:
      return handleFetchParticipantsSuccess(state, action);
  }

  return state;
}
