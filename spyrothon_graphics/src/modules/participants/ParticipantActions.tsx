import API from "@graphics/API";

import { loadParticipants } from "./ParticipantStore";

export async function fetchParticipants() {
  const participants = await API.participants.fetchParticipants();
  loadParticipants(participants);
}
