import { InitialParticipant, Participant } from "@spyrothon/api";

import API from "@admin/API";

import { loadParticipants } from "./ParticipantStore";

export async function fetchParticipants() {
  const participants = await API.participants.fetchParticipants();
  loadParticipants(participants);
}

export async function createParticipant(participant: InitialParticipant) {
  const updatedParticipant = await API.participants.createParticipant(participant);
  loadParticipants([updatedParticipant]);
}

export async function persistParticipant(participantId: string, changes: Partial<Participant>) {
  const updatedParticipant = await API.participants.updateParticipant(participantId, changes);
  loadParticipants([updatedParticipant]);
}
