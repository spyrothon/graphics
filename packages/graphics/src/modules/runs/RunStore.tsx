import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";

import { StoreState, getProp } from "@graphics/Store";

const getRunsState = (globalState: StoreState) => globalState.runs;

export default {
  isFetchingRuns: createSelector([getRunsState], (state) => state.fetching),
  getRuns: createSelector([getRunsState], (state) => Object.values(state.runs)),
  getRunsById: createSelector([getRunsState], (state) => state.runs),
  getRun: createCachedSelector(
    [getRunsState, getProp<string>("runId")],
    (state, runId) => state.runs[runId],
  )(getProp("runId")),
};
