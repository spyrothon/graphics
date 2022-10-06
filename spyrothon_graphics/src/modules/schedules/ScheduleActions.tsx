import { Schedule } from "@spyrothon/api";

import API from "@graphics/API";
import { SafeDispatch } from "@graphics/hooks/useDispatch";

import { fetchInterviewsSuccess } from "../interviews/InterviewActions";
import { fetchRunsSuccess } from "../runs/RunActions";
import { ScheduleAction, ScheduleActionType } from "./ScheduleTypes";

export function selectScheduleEntry(entryId?: string): ScheduleAction {
  return {
    type: ScheduleActionType.SCHEDULES_ENTRY_SELECTED,
    entryId,
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

export function loadSchedule(schedule: Schedule): ScheduleAction {
  return { type: ScheduleActionType.SCHEDULES_FETCH_SCHEDULE_SUCCESS, schedule };
}
