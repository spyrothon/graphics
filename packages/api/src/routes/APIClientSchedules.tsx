import { APIClientSubject } from "../APIClientTypes";
import type {
  InitialSchedule,
  InitialScheduleEntry,
  OBSWebsocketConfig,
  Schedule,
  ScheduleEntry,
  ScheduleResponse,
} from "../APITypes";
import Endpoints from "../Endpoints";

export class APIClientSchedules extends APIClientSubject {
  async fetchSchedules() {
    return await this.http.get<ScheduleResponse[]>(Endpoints.SCHEDULES);
  }

  async fetchSchedule(scheduleId: string) {
    return await this.http.get<ScheduleResponse>(Endpoints.SCHEDULE(scheduleId));
  }

  async createSchedule(schedule: InitialSchedule) {
    return await this.http.post<ScheduleResponse>(Endpoints.SCHEDULES, schedule);
  }

  async updateSchedule(scheduleId: string, schedule: Schedule) {
    return await this.http.put<ScheduleResponse>(Endpoints.SCHEDULE(scheduleId), schedule);
  }

  async deleteSchedule(scheduleId: string) {
    return await this.http.delete(Endpoints.SCHEDULE(scheduleId));
  }

  async updateScheduleEntry(scheduleId: string, entry: ScheduleEntry) {
    return await this.http.put<ScheduleEntry>(
      Endpoints.SCHEDULE_ENTRY(scheduleId, entry.id),
      entry,
    );
  }

  async addScheduleEntry(scheduleId: string, entry: InitialScheduleEntry) {
    return await this.http.post<ScheduleResponse>(Endpoints.SCHEDULE_ENTRIES(scheduleId), entry);
  }

  async removeScheduleEntry(scheduleId: string, entryId: string) {
    return await this.http.delete(Endpoints.SCHEDULE_ENTRY(scheduleId, entryId));
  }

  async transitionToScheduleEntry(scheduleId: string, entryId: string) {
    return await this.http.put<ScheduleResponse>(Endpoints.SCHEDULE_TRANSITION(scheduleId), {
      entryId,
    });
  }

  async fetchScheduleOBSConfig(scheduleId: string) {
    return await this.http.get<OBSWebsocketConfig>(Endpoints.SCHEDULE_OBS_CONFIG(scheduleId));
  }

  async updateScheduleOBSConfig(scheduleId: string, config: OBSWebsocketConfig) {
    return await this.http.post<OBSWebsocketConfig>(
      Endpoints.SCHEDULE_OBS_CONFIG(scheduleId),
      config,
    );
  }

  async fetchScheduleRTMPStat(scheduleId: string) {
    return await this.http.get<string>(Endpoints.SCHEDULE_RTMP_STAT(scheduleId));
  }
}
