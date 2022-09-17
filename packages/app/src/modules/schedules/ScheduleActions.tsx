import { APIClient, Schedule, ScheduleResponse } from "@spyrothon/api";

import { SafeDispatch } from "@app/hooks/useDispatch";

import { fetchInterviewsSuccess } from "../interviews/InterviewActions";
import { fetchRunsSuccess } from "../runs/RunActions";
import { ScheduleAction,ScheduleActionType } from "./ScheduleTypes";

export function selectScheduleEntry(entryId?: string): ScheduleAction {
  return {
    type: ScheduleActionType.SCHEDULES_ENTRY_SELECTED,
    entryId,
  };
}

export function setCurrentSchedule(newSchedule: ScheduleResponse) {
  const { runs, interviews, ...schedule } = newSchedule;

  return async (dispatch: SafeDispatch) => {
    await APIClient.updateInit({ scheduleId: schedule.id });
    dispatch(loadSchedule(schedule));
    dispatch(fetchInterviewsSuccess(interviews));
    dispatch(fetchRunsSuccess(runs));
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
