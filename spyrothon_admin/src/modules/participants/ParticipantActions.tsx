import { InitialParticipant, Participant } from "@spyrothon/api";

import API from "@admin/API";
import { SafeDispatch } from "@admin/hooks/useDispatch";

import { ParticipantAction, ParticipantActionType } from "./ParticipantTypes";

export function createParticipant(participant: InitialParticipant) {
  return async (dispatch: SafeDispatch) => {
    const updatedParticipant = await API.participants.createParticipant(participant);
    dispatch({
      type: ParticipantActionType.PARTICIPANTS_UPDATE_PARTICIPANT,
      participant: updatedParticipant,
    });
  };
}

export function updateParticipant(participant: Participant): ParticipantAction {
  return {
    type: ParticipantActionType.PARTICIPANTS_UPDATE_PARTICIPANT,
    participant,
  };
}

export function fetchInterviews() {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: ParticipantActionType.PARTICIPANTS_FETCH_PARTICIPANTS_STARTED });
    const participants = await API.participants.fetchParticipants();

    dispatch(fetchParticipantsSuccess(participants));
  };
}

export function loadParticipant(participant: Participant): ParticipantAction {
  return {
    type: ParticipantActionType.PARTICIPANTS_FETCH_PARTICIPANTS_SUCCESS,
    participants: [participant],
  };
}

export function fetchParticipantsSuccess(participants: Participant[]): ParticipantAction {
  return { type: ParticipantActionType.PARTICIPANTS_FETCH_PARTICIPANTS_SUCCESS, participants };
}

export function persistParticipant(participantId: string, changes: Partial<Participant>) {
  return async (dispatch: SafeDispatch) => {
    const updatedParticipant = await API.participants.updateParticipant(participantId, changes);
    dispatch({
      type: ParticipantActionType.PARTICIPANTS_UPDATE_PARTICIPANT,
      participant: updatedParticipant,
    });
  };
}
