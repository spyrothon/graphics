import { Run } from "@spyrothon/api";

import { Action, ActionFor } from "../../Actions";
import { RunActionType } from "./RunsTypes";

type RunMap = { [id: string]: Run };

type RunReducerState = {
  fetching: boolean;
  runs: RunMap;
};

function handleUpdateRun(state: RunReducerState, action: ActionFor<RunActionType.RUNS_UPDATE_RUN>) {
  const { run } = action;

  return {
    ...state,
    runs: {
      ...state.runs,
      [run.id]: run,
    },
  };
}

function handleFetchRunsStarted(
  state: RunReducerState,
  _action: ActionFor<RunActionType.RUNS_FETCH_RUNS_STARTED>,
) {
  return {
    ...state,
    fetching: true,
  };
}

function handleFetchRunsSuccess(
  state: RunReducerState,
  action: ActionFor<RunActionType.RUNS_FETCH_RUNS_SUCCESS>,
) {
  const { runs } = action;
  const runsById = runs.reduce<RunMap>((acc, run) => {
    acc[run.id] = run;
    return acc;
  }, {});

  return {
    ...state,
    fetching: false,
    runs: { ...state.runs, ...runsById },
  };
}

const defaultState: RunReducerState = {
  fetching: false,
  runs: {},
};

export default function runsReducer(
  state: RunReducerState = defaultState,
  action: Action,
): RunReducerState {
  switch (action.type) {
    case RunActionType.RUNS_UPDATE_RUN:
      return handleUpdateRun(state, action);
    case RunActionType.RUNS_FETCH_RUNS_STARTED:
      return handleFetchRunsStarted(state, action);
    case RunActionType.RUNS_FETCH_RUNS_SUCCESS:
      return handleFetchRunsSuccess(state, action);
  }

  return state;
}
