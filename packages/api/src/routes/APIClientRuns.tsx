import { APIClientSubject } from "../APIClientTypes";
import { InitialRun, Run, Runner } from "../APITypes";
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

  async resetRun(runId: string) {
    return await this.http.patch<Run>(Endpoints.RUN_RESET(runId));
  }

  async finishRunner(runId: string, runnerId: string) {
    return await this.http.patch<Run>(Endpoints.RUN_RUNNER_FINISH(runId, runnerId));
  }

  async resumeRunner(runId: string, runnerId: string) {
    return await this.http.patch<Run>(Endpoints.RUN_RUNNER_RESUME(runId, runnerId));
  }

  async addRunner(runId: string, data: Partial<Runner>) {
    return await this.http.post<Run>(Endpoints.RUN_RUNNERS(runId), data);
  }

  async updateRunner(runId: string, runnerId: string, data: Partial<Runner>) {
    return await this.http.put<Run>(Endpoints.RUN_RUNNER(runId, runnerId), data);
  }

  async removeRunner(runId: string, runnerId: string) {
    return await this.http.delete(Endpoints.RUN_RUNNER(runId, runnerId));
  }
}
