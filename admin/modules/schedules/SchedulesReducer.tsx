import { Schedule } from "../../../api/APITypes";
import { ActionFor, Action } from "../../Actions";
import { ScheduleActionType } from "./ScheduleTypes";

type ScheduleReducerState = {
  fetching: boolean;
  schedule?: Schedule;
  selectedEntryId?: string;
};

function handleFetchScheduleStarted(
  state: ScheduleReducerState,
  _action: ActionFor<ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_STARTED>,
) {
  return {
    ...state,
    fetching: true,
  };
}

function handleFetchScheduleSuccess(
  state: ScheduleReducerState,
  action: ActionFor<ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_SUCCESS>,
) {
  const { schedule } = action;
  return {
    ...state,
    fetching: false,
    schedule,
  };
}

function handleEntrySelected(
  state: ScheduleReducerState,
  action: ActionFor<ScheduleActionType.SCHEDULES_ENTRY_SELECTED>,
) {
  const { entryId } = action;
  return {
    ...state,
    selectedEntryId: entryId,
  };
}

const defaultState: ScheduleReducerState = {
  fetching: false,
  schedule: undefined,
  selectedEntryId: undefined,
};

export default function schedulesReducer(
  state: ScheduleReducerState = defaultState,
  action: Action,
): ScheduleReducerState {
  switch (action.type) {
    case ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_STARTED:
      return handleFetchScheduleStarted(state, action);
    case ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_SUCCESS:
      return handleFetchScheduleSuccess(state, action);
    case ScheduleActionType.SCHEDULES_ENTRY_SELECTED:
      return handleEntrySelected(state, action);
  }

  return state;
}
