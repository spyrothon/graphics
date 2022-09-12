import { APIClient, Run } from "@spyrothon/api";
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
    const updatedRun = await APIClient.updateRun(runId, filteredChanges);
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

export const startRun = (runId: string) => _runTimingAction(runId, APIClient.startRun);
export const finishRun = (runId: string) => _runTimingAction(runId, APIClient.finishRun);
export const pauseRun = (runId: string) => _runTimingAction(runId, APIClient.pauseRun);
export const resumeRun = (runId: string) => _runTimingAction(runId, APIClient.resumeRun);
export const resetRun = (runId: string) => _runTimingAction(runId, APIClient.resetRun);

export function finishRunParticipant(runId: string, participantId: string) {
  return async (dispatch: SafeDispatch) => {
    const run = await APIClient.finishParticipant(runId, participantId);

    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run,
    });
  };
}

export function resumeRunParticipant(runId: string, participantId: string) {
  return async (dispatch: SafeDispatch) => {
    const run = await APIClient.resumeParticipant(runId, participantId);

    dispatch({
      type: RunActionType.RUNS_UPDATE_RUN,
      run,
    });
  };
}
