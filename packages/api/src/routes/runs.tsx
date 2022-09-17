import type { InitialRun,Run } from "../APITypes";
import Endpoints from "../Endpoints";
import HTTPUtils from "../HTTPUtils";

export async function fetchRuns() {
  return await HTTPUtils.get<Run[]>(Endpoints.RUNS);
}

export async function fetchRun(runId: string) {
  return await HTTPUtils.get<Run>(Endpoints.RUN(runId));
}

export async function createRun(runData: InitialRun) {
  return await HTTPUtils.post<Run>(Endpoints.RUNS, runData);
}

export async function updateRun(runId: string, runData: Partial<Run>) {
  return await HTTPUtils.put<Run>(Endpoints.RUN(runId), runData);
}

export async function deleteRun(runId: string) {
  return await HTTPUtils.delete(Endpoints.RUN(runId));
}

export async function startRun(runId: string) {
  return await HTTPUtils.patch<Run>(Endpoints.RUN_START(runId));
}

export async function finishRun(runId: string) {
  return await HTTPUtils.patch<Run>(Endpoints.RUN_FINISH(runId));
}

export async function pauseRun(runId: string) {
  return await HTTPUtils.patch<Run>(Endpoints.RUN_PAUSE(runId));
}

export async function resumeRun(runId: string) {
  return await HTTPUtils.patch<Run>(Endpoints.RUN_RESUME(runId));
}

export async function finishParticipant(runId: string, participantId: string) {
  return await HTTPUtils.patch<Run>(Endpoints.RUN_PARTICIPANT_FINISH(runId, participantId));
}

export async function resumeParticipant(runId: string, participantId: string) {
  return await HTTPUtils.patch<Run>(Endpoints.RUN_PARTICIPANT_RESUME(runId, participantId));
}

export async function resetRun(runId: string) {
  return await HTTPUtils.patch<Run>(Endpoints.RUN_RESET(runId));
}
