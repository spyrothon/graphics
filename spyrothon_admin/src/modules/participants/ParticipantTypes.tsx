import { Participant } from "@spyrothon/api";

export enum ParticipantActionType {
  PARTICIPANTS_UPDATE_PARTICIPANT = "PARTICIPANTS_UPDATE_PARTICIPANT",
  PARTICIPANTS_FETCH_PARTICIPANTS_STARTED = "PARTICIPANTS_FETCH_PARTICIPANTS_STARTED",
  PARTICIPANTS_FETCH_PARTICIPANTS_SUCCESS = "PARTICIPANTS_FETCH_PARTICIPANTS_SUCCESS",
}

export type ParticipantAction =
  | {
      type: ParticipantActionType.PARTICIPANTS_UPDATE_PARTICIPANT;
      participant: Participant;
    }
  | { type: ParticipantActionType.PARTICIPANTS_FETCH_PARTICIPANTS_STARTED }
  | {
      type: ParticipantActionType.PARTICIPANTS_FETCH_PARTICIPANTS_SUCCESS;
      participants: Participant[];
    };
