import { APIClient, Run } from "@spyrothon/api";

import { SafeDispatch } from "@graphics/hooks/useDispatch";

import { RunAction, RunActionType } from "./RunsTypes";

export function updateRun(run: Run): RunAction {
  return {
    type: RunActionType.RUNS_UPDATE_RUN,
    run,
  };
}

export function fetchRuns() {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: RunActionType.RUNS_FETCH_RUNS_STARTED });
    const runs = await APIClient.fetchRuns();

    dispatch(fetchRunsSuccess(runs));
  };
}

export function loadRun(run: Run): RunAction {
  return { type: RunActionType.RUNS_FETCH_RUNS_SUCCESS, runs: [run] };
}

export function fetchRunsSuccess(runs: Run[]): RunAction {
  return { type: RunActionType.RUNS_FETCH_RUNS_SUCCESS, runs };
}

export function persistRun(run: Run) {
  return async (dispatch: SafeDispatch) => {
    const filteredRun = {
      ...run,
      runners: run.runners.filter((entry) => entry?.displayName !== ""),
      commentators: run.commentators.filter((entry) => entry?.displayName !== ""),
    };
    const updatedRun = await APIClient.updateRun(run.id, filteredRun);
    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run: updatedRun,
    });
  };
}
