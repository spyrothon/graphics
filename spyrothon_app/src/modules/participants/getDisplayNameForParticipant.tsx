import { Commentator, InterviewParticipant, Runner } from "@spyrothon/api";

import useParticipantsStore from "./ParticipantStore";

export default function getDisplayNameForParticipant(
  entity: Runner | Commentator | InterviewParticipant,
): string {
  const participant = useParticipantsStore.getState().participants[entity.participantId];
  return entity.displayName ?? participant?.displayName ?? "(unnamed)";
}

export function useDisplayNameForParticipant(
  entity: Runner | Commentator | InterviewParticipant,
): string {
  const participant = useParticipantsStore((state) => state.participants[entity.participantId]);
  return entity.displayName ?? participant?.displayName ?? "(unnamed)";
}
