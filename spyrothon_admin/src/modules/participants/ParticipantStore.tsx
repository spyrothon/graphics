import createCachedSelector from "re-reselect";
import { createSelector } from "reselect";

import { getProp, StoreState } from "../../Store";

const getParticipantsState = (globalState: StoreState) => globalState.participants;

export const isFetchingParticipants = createSelector(
  [getParticipantsState],
  (state) => state.fetching,
);
export const getParticipants = createSelector([getParticipantsState], (state) =>
  Object.values(state.participants),
);
export const getParticipantsById = createSelector(
  [getParticipantsState],
  (state) => state.participants,
);
export const getParticipant = createCachedSelector(
  [getParticipantsState, getProp<string>("participantId")],
  (state, participantId) => state.participants[participantId],
)(getProp("participantId"));
