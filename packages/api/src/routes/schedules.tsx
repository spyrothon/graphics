import HTTPUtils from "../HTTPUtils";
import Endpoints from "../Endpoints";

import type {
  Schedule,
  ScheduleResponse,
  InitialSchedule,
  InitialScheduleEntry,
  ScheduleEntry,
  OBSWebsocketConfig,
} from "../APITypes";

export async function fetchSchedules() {
  return await HTTPUtils.get<ScheduleResponse[]>(Endpoints.SCHEDULES);
}

export async function fetchSchedule(scheduleId: string) {
  return await HTTPUtils.get<ScheduleResponse>(Endpoints.SCHEDULE(scheduleId));
}

export async function createSchedule(schedule: InitialSchedule) {
  return await HTTPUtils.post<ScheduleResponse>(Endpoints.SCHEDULES, schedule);
}

export async function updateSchedule(scheduleId: string, schedule: Schedule) {
  return await HTTPUtils.put<ScheduleResponse>(Endpoints.SCHEDULE(scheduleId), schedule);
}

export async function deleteSchedule(scheduleId: string) {
  return await HTTPUtils.delete(Endpoints.SCHEDULE(scheduleId));
}

export async function updateScheduleEntry(scheduleId: string, entry: ScheduleEntry) {
  return await HTTPUtils.put<ScheduleEntry>(Endpoints.SCHEDULE_ENTRY(scheduleId, entry.id), entry);
}

export async function addScheduleEntry(scheduleId: string, entry: InitialScheduleEntry) {
  return await HTTPUtils.post<ScheduleResponse>(Endpoints.SCHEDULE_ENTRIES(scheduleId), entry);
}

export async function removeScheduleEntry(scheduleId: string, entryId: string) {
  return await HTTPUtils.delete(Endpoints.SCHEDULE_ENTRY(scheduleId, entryId));
}

export async function transitionToScheduleEntry(scheduleId: string, entryId: string) {
  return await HTTPUtils.put<ScheduleResponse>(Endpoints.SCHEDULE_TRANSITION(scheduleId), {
    entryId,
  });
}

export async function fetchScheduleOBSConfig(scheduleId: string) {
  return await HTTPUtils.get<OBSWebsocketConfig>(Endpoints.SCHEDULE_OBS_CONFIG(scheduleId));
}

export async function updateScheduleOBSConfig(scheduleId: string, config: OBSWebsocketConfig) {
  return await HTTPUtils.post<OBSWebsocketConfig>(
    Endpoints.SCHEDULE_OBS_CONFIG(scheduleId),
    config,
  );
}

export async function fetchScheduleRTMPStat(scheduleId: string) {
  return await HTTPUtils.get<string>(Endpoints.SCHEDULE_RTMP_STAT(scheduleId));
}
