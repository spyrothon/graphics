import { Run } from "@spyrothon/api";

import API from "@admin/API";
import { SafeDispatch } from "@admin/hooks/useDispatch";

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
    const runs = await API.runs.fetchRuns();

    dispatch(fetchRunsSuccess(runs));
  };
}

export function loadRun(run: Run): RunAction {
  return { type: RunActionType.RUNS_FETCH_RUNS_SUCCESS, runs: [run] };
}

export function fetchRunsSuccess(runs: Run[]): RunAction {
  return { type: RunActionType.RUNS_FETCH_RUNS_SUCCESS, runs };
}

export function persistRun(runId: string, changes: Partial<Run>) {
  return async (dispatch: SafeDispatch) => {
    const filteredChanges = { ...changes };
    if (changes.runners != null) {
      filteredChanges.runners = changes.runners.filter((entry) => entry?.displayName !== "");
    }
    if (changes.commentators != null) {
      filteredChanges.commentators = changes.commentators.filter(
        (entry) => entry?.displayName !== "",
      );
    }
    const updatedRun = await API.runs.updateRun(runId, filteredChanges);
    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run: updatedRun,
    });
  };
}

function _runTimingAction(runId: string, action: (runId: string) => Promise<Run>) {
  return async (dispatch: SafeDispatch) => {
    const run = await action(runId);

    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run: run,
    });
  };
}

export const startRun = (runId: string) => _runTimingAction(runId, API.runs.startRun);
export const finishRun = (runId: string) => _runTimingAction(runId, API.runs.finishRun);
export const pauseRun = (runId: string) => _runTimingAction(runId, API.runs.pauseRun);
export const resumeRun = (runId: string) => _runTimingAction(runId, API.runs.resumeRun);
export const resetRun = (runId: string) => _runTimingAction(runId, API.runs.resetRun);

export function finishRunParticipant(runId: string, participantId: string) {
  return async (dispatch: SafeDispatch) => {
    const run = await API.runs.finishParticipant(runId, participantId);

    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run,
    });
  };
}

export function resumeRunParticipant(runId: string, participantId: string) {
  return async (dispatch: SafeDispatch) => {
    const run = await API.runs.resumeParticipant(runId, participantId);

    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run,
    });
  };
}
