import { APIClientSubject } from "../APIClientTypes";
import type { InitialRun, Run } from "../APITypes";
import Endpoints from "../Endpoints";

export class APIClientRuns extends APIClientSubject {
  async fetchRuns() {
    return await this.http.get<Run[]>(Endpoints.RUNS);
  }

  async fetchRun(runId: string) {
    return await this.http.get<Run>(Endpoints.RUN(runId));
  }

  async createRun(runData: InitialRun) {
    return await this.http.post<Run>(Endpoints.RUNS, runData);
  }

  async updateRun(runId: string, runData: Partial<Run>) {
    return await this.http.put<Run>(Endpoints.RUN(runId), runData);
  }

  async deleteRun(runId: string) {
    return await this.http.delete(Endpoints.RUN(runId));
  }

  async startRun(runId: string) {
    return await this.http.patch<Run>(Endpoints.RUN_START(runId));
  }

  async finishRun(runId: string) {
    return await this.http.patch<Run>(Endpoints.RUN_FINISH(runId));
  }

  async pauseRun(runId: string) {
    return await this.http.patch<Run>(Endpoints.RUN_PAUSE(runId));
  }

  async resumeRun(runId: string) {
    return await this.http.patch<Run>(Endpoints.RUN_RESUME(runId));
  }

  async finishParticipant(runId: string, participantId: string) {
    return await this.http.patch<Run>(Endpoints.RUN_PARTICIPANT_FINISH(runId, participantId));
  }

  async resumeParticipant(runId: string, participantId: string) {
    return await this.http.patch<Run>(Endpoints.RUN_PARTICIPANT_RESUME(runId, participantId));
  }

  async resetRun(runId: string) {
    return await this.http.patch<Run>(Endpoints.RUN_RESET(runId));
  }
}
