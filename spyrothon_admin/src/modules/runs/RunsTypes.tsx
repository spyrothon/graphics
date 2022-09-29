import type { Run } from "@spyrothon/api";

export enum RunActionType {
  RUNS_UPDATE_RUN = "RUNS_UPDATE_RUN",
  RUNS_FETCH_RUNS_STARTED = "RUNS_FETCH_RUNS_STARTED",
  RUNS_FETCH_RUNS_SUCCESS = "RUNS_FETCH_RUNS_SUCCESS",
}

export type RunAction =
  | {
      type: RunActionType.RUNS_UPDATE_RUN;
      run: Run;
    }
  | { type: RunActionType.RUNS_FETCH_RUNS_STARTED }
  | {
      type: RunActionType.RUNS_FETCH_RUNS_SUCCESS;
      runs: Run[];
    };
