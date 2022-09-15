import { Schedule } from "@spyrothon/api";
import { ActionFor, Action } from "@graphics/Actions";
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

function handleEntryDeleted(
  state: ScheduleReducerState,
  action: ActionFor<ScheduleActionType.SCHEDULES_ENTRY_DELETED>,
) {
  const { entryId } = action;
  if (state.schedule == null) return state;

  const newState = {
    ...state,
    schedule: {
      ...state.schedule,
      scheduleEntries: state.schedule.scheduleEntries.filter((entry) => entry.id !== entryId),
    },
  };

  return newState;
}

function handleEntryUpdated(
  state: ScheduleReducerState,
  action: ActionFor<ScheduleActionType.SCHEDULES_ENTRY_UPDATED>,
) {
  const { entry: updatedEntry } = action;
  if (state.schedule == null) return state;

  const scheduleEntries = state.schedule.scheduleEntries.map((entry) =>
    entry.id === updatedEntry.id ? updatedEntry : entry,
  );

  const newState = {
    ...state,
    schedule: {
      ...state.schedule,
      scheduleEntries,
    },
  };

  return newState;
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
    case ScheduleActionType.SCHEDULES_ENTRY_DELETED:
      return handleEntryDeleted(state, action);
    case ScheduleActionType.SCHEDULES_ENTRY_UPDATED:
      return handleEntryUpdated(state, action);
  }

  return state;
}
