import createCachedSelector from "re-reselect";
import { createSelector } from "reselect";

import { getProp,StoreState } from "../../Store";

const getInterviewsState = (globalState: StoreState) => globalState.interviews;

export const isFetchingInterviews = createSelector([getInterviewsState], (state) => state.fetching);
export const getInterviews = createSelector([getInterviewsState], (state) =>
  Object.values(state.interviews),
);
export const getInterviewsById = createSelector([getInterviewsState], (state) => state.interviews);
export const getInterview = createCachedSelector(
  [getInterviewsState, getProp<string>("interviewId")],
  (state, interviewId) => state.interviews[interviewId],
)(getProp("interviewId"));
