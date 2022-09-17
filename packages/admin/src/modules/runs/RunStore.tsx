import createCachedSelector from "re-reselect";
import { createSelector } from "reselect";

import { getProp,StoreState } from "../../Store";

const getRunsState = (globalState: StoreState) => globalState.runs;

export const isFetchingRuns = createSelector([getRunsState], (state) => state.fetching);
export const getRuns = createSelector([getRunsState], (state) => Object.values(state.runs));
export const getRunsById = createSelector([getRunsState], (state) => state.runs);
export const getRun = createCachedSelector(
  [getRunsState, getProp<string>("runId")],
  (state, runId) => state.runs[runId],
)(getProp("runId"));
