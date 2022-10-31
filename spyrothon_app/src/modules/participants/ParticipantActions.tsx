import API from "@app/API";

import { loadParticipants } from "./ParticipantStore";

export async function fetchParticipants() {
  const participants = await API.participants.fetchParticipants();
  loadParticipants(participants);
}
