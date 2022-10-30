import { Run, Runner } from "@spyrothon/api";

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
    const updatedRun = await API.runs.updateRun(runId, changes);
    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run: updatedRun,
    });
  };
}

export function addRunner(runId: string, runner: Partial<Runner>) {
  return async (dispatch: SafeDispatch) => {
    const updatedRun = await API.runs.addRunner(runId, runner);
    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run: updatedRun,
    });
  };
}

export function removeRunner(runId: string, runnerId: string) {
  return async (dispatch: SafeDispatch) => {
    await API.runs.removeRunner(runId, runnerId);
    const updatedRun = await API.runs.fetchRun(runId);

    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run: updatedRun,
    });
  };
}

export function persistRunner(runId: string, runnerId: string, changes: Partial<Runner>) {
  return async (dispatch: SafeDispatch) => {
    const updatedRun = await API.runs.updateRunner(runId, runnerId, changes);
    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run: updatedRun,
    });
  };
}

function _timingAction(runId: string, action: (runId: string) => Promise<Run>) {
  return async (dispatch: SafeDispatch) => {
    const run = await action(runId);

    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run: run,
    });
  };
}

export const startRun = (runId: string) => _timingAction(runId, () => API.runs.startRun(runId));
export const finishRun = (runId: string) => _timingAction(runId, () => API.runs.finishRun(runId));
export const pauseRun = (runId: string) => _timingAction(runId, () => API.runs.pauseRun(runId));
export const resumeRun = (runId: string) => _timingAction(runId, () => API.runs.resumeRun(runId));
export const resetRun = (runId: string) => _timingAction(runId, () => API.runs.resetRun(runId));

export function finishRunParticipant(runId: string, participantId: string) {
  return async (dispatch: SafeDispatch) => {
    const run = await API.runs.finishRunner(runId, participantId);

    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run,
    });
  };
}

export function resumeRunParticipant(runId: string, participantId: string) {
  return async (dispatch: SafeDispatch) => {
    const run = await API.runs.resumeRunner(runId, participantId);

    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run,
    });
  };
}
