import { Commentator, InterviewParticipant, Runner } from "@spyrothon/api";

import useParticipantsStore from "./ParticipantStore";

export default function renderParticipantNames<T = string>(
  entities: Array<Runner | Commentator | InterviewParticipant>,
  render?: (name: string) => T,
): T[] {
  const participants = useParticipantsStore.getState().participants;

  return entities.map((entity): T => {
    const participant = participants[entity.participantId];
    const name = entity.displayName ?? participant.displayName;
    return render?.(name) ?? (name as T);
  });
}
