import {
  InitialSchedule,
  OBSWebsocketConfig,
  Schedule,
  ScheduleEntry,
  ScheduleResponse,
  TransitionSet,
} from "@spyrothon/api";

import API from "@admin/API";
import { SafeDispatch } from "@admin/hooks/useDispatch";

import { fetchInterviewsSuccess } from "../interviews/InterviewActions";
import { fetchRunsSuccess } from "../runs/RunActions";
import { ScheduleAction, ScheduleActionType } from "./ScheduleTypes";

export function selectScheduleEntry(entryId?: string): ScheduleAction {
  return {
    type: ScheduleActionType.SCHEDULES_ENTRY_SELECTED,
    entryId,
  };
}

export function setCurrentSchedule(newSchedule: ScheduleResponse) {
  const { runs, interviews, ...schedule } = newSchedule;

  return async (dispatch: SafeDispatch) => {
    await API.init.updateInit({ scheduleId: schedule.id });
    dispatch(loadSchedule(schedule));
    dispatch(fetchInterviewsSuccess(interviews));
    dispatch(fetchRunsSuccess(runs));
    await dispatch(fetchScheduleOBSConfig(schedule.id));
  };
}

export function createSchedule(schedule: InitialSchedule) {
  return async (dispatch: SafeDispatch) => {
    const response = await API.schedules.createSchedule(schedule);
    dispatch(setCurrentSchedule(response));
  };
}

export function updateSchedule(schedule: Schedule) {
  return async (dispatch: SafeDispatch) => {
    const updatedSchedule = await API.schedules.updateSchedule(schedule.id, schedule);
    dispatch(loadSchedule(updatedSchedule));
  };
}

export function addRunToSchedule(scheduleId: string) {
  return async (dispatch: SafeDispatch) => {
    const run = await API.runs.createRun({ gameName: "New Run" });
    dispatch(fetchRunsSuccess([run]));
    const updatedSchedule = await API.schedules.addScheduleEntry(scheduleId, {
      runId: run.id,
    });
    const newEntry = updatedSchedule.scheduleEntries[updatedSchedule.scheduleEntries.length - 1];
    dispatch(loadSchedule(updatedSchedule));
    dispatch(selectScheduleEntry(newEntry.id));
  };
}

export function addInterviewToSchedule(scheduleId: string) {
  return async (dispatch: SafeDispatch) => {
    const interview = await API.interviews.createInterview({ topic: "New Interview" });
    dispatch(fetchInterviewsSuccess([interview]));
    const updatedSchedule = await API.schedules.addScheduleEntry(scheduleId, {
      interviewId: interview.id,
    });
    const newEntry = updatedSchedule.scheduleEntries[updatedSchedule.scheduleEntries.length - 1];
    dispatch(loadSchedule(updatedSchedule));
    dispatch(selectScheduleEntry(newEntry.id));
  };
}

export function removeScheduleEntry(scheduleId: string, entryId: string) {
  return async (dispatch: SafeDispatch) => {
    await API.schedules.removeScheduleEntry(scheduleId, entryId);
    dispatch({ type: ScheduleActionType.SCHEDULES_ENTRY_DELETED, entryId });
  };
}

export function updateScheduleEntry(entry: ScheduleEntry) {
  return async (dispatch: SafeDispatch) => {
    const updatedEntry = await API.schedules.updateScheduleEntry(entry.scheduleId, entry);
    dispatch({ type: ScheduleActionType.SCHEDULES_ENTRY_UPDATED, entry: updatedEntry });
  };
}

export function reorderScheduleEntries(schedule: Schedule, entryIds: string[]) {
  return async (dispatch: SafeDispatch) => {
    const orderedEntries = entryIds
      .map((entryId) => schedule.scheduleEntries.find((entry) => entry.id === entryId))
      .filter((entry): entry is ScheduleEntry => entry != null)
      .map((entry, index) => ({ ...entry, position: index }));

    const newSchedule = { ...schedule, scheduleEntries: orderedEntries };
    const updatedSchedule = await API.schedules.updateSchedule(schedule.id, newSchedule);
    dispatch(loadSchedule(updatedSchedule));
  };
}

export function fetchSchedule(scheduleId: string) {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_STARTED });
    const scheduleResponse = await API.schedules.fetchSchedule(scheduleId);
    const { runs, interviews, ...schedule } = scheduleResponse;

    dispatch(loadSchedule(schedule));
    dispatch(fetchInterviewsSuccess(interviews));
    dispatch(fetchRunsSuccess(runs));
  };
}

export function transitionToSecheduleEntry(scheduleId: string, entryId: string) {
  return async (dispatch: SafeDispatch) => {
    const scheduleResponse = await API.schedules.transitionToScheduleEntry(scheduleId, entryId);
    const { runs, interviews, ...schedule } = scheduleResponse;

    dispatch(loadSchedule(schedule));
    dispatch(fetchInterviewsSuccess(interviews));
    dispatch(fetchRunsSuccess(runs));
  };
}

export function resetTransitionSet(transitionSet: TransitionSet) {
  return async (dispatch: SafeDispatch) => {
    const scheduleResponse = await API.transitions.resetTransitionSet(transitionSet.id);
    dispatch(loadSchedule(scheduleResponse));
  };
}

export function loadSchedule(schedule: Schedule): ScheduleAction {
  return { type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_SUCCESS, schedule };
}

export function fetchScheduleOBSConfig(scheduleId: string) {
  return async (dispatch: SafeDispatch) => {
    const config = await API.schedules.fetchScheduleOBSConfig(scheduleId);
    dispatch(loadOBSConfig(config));
  };
}

export function updateScheduleOBSConfig(scheduleId: string, config: OBSWebsocketConfig) {
  return async (dispatch: SafeDispatch) => {
    const savedConfig = await API.schedules.updateScheduleOBSConfig(scheduleId, config);
    dispatch(loadOBSConfig(savedConfig));
  };
}

export function loadOBSConfig(config: OBSWebsocketConfig): ScheduleAction {
  return { type: ScheduleActionType.SCHEDULES_FETCH_OBS_SUCCESS, config };
}
