import { APIClient, Schedule, ScheduleEntry } from "@spyrothon/api";

import { SafeDispatch } from "@graphics/hooks/useDispatch";

import { fetchInterviewsSuccess } from "../interviews/InterviewActions";
import { fetchRunsSuccess } from "../runs/RunActions";
import { ScheduleAction,ScheduleActionType } from "./ScheduleTypes";

export function selectScheduleEntry(entryId?: string): ScheduleAction {
  return {
    type: ScheduleActionType.SCHEDULES_ENTRY_SELECTED,
    entryId,
  };
}

export function addRunToSchedule(scheduleId: string) {
  return async (dispatch: SafeDispatch) => {
    const run = await APIClient.createRun({ gameName: "New Run" });
    dispatch(fetchRunsSuccess([run]));
    const updatedSchedule = await APIClient.addScheduleEntry(scheduleId, { runId: run.id });
    const newEntry = updatedSchedule.scheduleEntries[updatedSchedule.scheduleEntries.length - 1];
    dispatch(loadSchedule(updatedSchedule));
    dispatch(selectScheduleEntry(newEntry.id));
  };
}

export function addInterviewToSchedule(scheduleId: string) {
  return async (dispatch: SafeDispatch) => {
    const interview = await APIClient.createInterview({ topic: "New Interview" });
    dispatch(fetchInterviewsSuccess([interview]));
    const updatedSchedule = await APIClient.addScheduleEntry(scheduleId, {
      interviewId: interview.id,
    });
    const newEntry = updatedSchedule.scheduleEntries[updatedSchedule.scheduleEntries.length - 1];
    dispatch(loadSchedule(updatedSchedule));
    dispatch(selectScheduleEntry(newEntry.id));
  };
}

export function removeScheduleEntry(scheduleId: string, entryId: string) {
  return async (dispatch: SafeDispatch) => {
    await APIClient.removeScheduleEntry(scheduleId, entryId);
    dispatch({ type: ScheduleActionType.SCHEDULES_ENTRY_DELETED, entryId });
  };
}

export function updateScheduleEntry(entry: ScheduleEntry) {
  return async (dispatch: SafeDispatch) => {
    const updatedEntry = await APIClient.updateScheduleEntry(entry.scheduleId, entry);
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
    const updatedSchedule = await APIClient.updateSchedule(schedule.id, newSchedule);
    dispatch(loadSchedule(updatedSchedule));
  };
}

export function fetchSchedule(scheduleId: string) {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_STARTED });
    const scheduleResponse = await APIClient.fetchSchedule(scheduleId);
    const { runs, interviews, ...schedule } = scheduleResponse;

    dispatch(loadSchedule(schedule));
    dispatch(fetchInterviewsSuccess(interviews));
    dispatch(fetchRunsSuccess(runs));
  };
}

export function loadSchedule(schedule: Schedule): ScheduleAction {
  return { type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_SUCCESS, schedule };
}
