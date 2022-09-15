import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";

import { StoreState, getProp } from "@graphics/Store";

const getInterviewsState = (globalState: StoreState) => globalState.interviews;

export default {
  isFetchingInterviews: createSelector([getInterviewsState], (state) => state.fetching),
  getInterviews: createSelector([getInterviewsState], (state) => Object.values(state.interviews)),
  getInterviewsById: createSelector([getInterviewsState], (state) => state.interviews),
  getInterview: createCachedSelector(
    [getInterviewsState, getProp<string>("interviewId")],
    (state, interviewId) => state.interviews[interviewId],
  )(getProp("interviewId")),
};
