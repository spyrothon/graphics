import { Run } from "@spyrothon/api";

export enum RunState {
  READY = "Ready",
  IN_PROGRESS = "In progress",
  PAUSED = "Paused",
  FINISHED = "Finished",
}

export default function getRunState(run: Run) {
  if (run.finishedAt != null) {
    return RunState.FINISHED;
  }

  if (run.pausedAt != null) {
    return RunState.PAUSED;
  }

  if (run.startedAt != null) {
    return RunState.IN_PROGRESS;
  }

  return RunState.READY;
}
