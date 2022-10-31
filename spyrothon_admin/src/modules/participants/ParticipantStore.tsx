import create from "zustand";
import { Participant } from "@spyrothon/api";

interface ParticipantsStoreState {
  participants: Record<string, Participant>;
}

const useParticipantsStore = create<ParticipantsStoreState>(() => ({
  participants: {},
}));

export default useParticipantsStore;

export function loadParticipants(participants: Participant[]) {
  useParticipantsStore.setState((state) => {
    const updatedParticipants = state.participants;
    for (const participant of participants) {
      updatedParticipants[participant.id] = participant;
    }

    return { participants: updatedParticipants };
  });
}

export function useParticipant(participantId: string) {
  return useParticipantsStore((state) => state.participants[participantId]);
}
