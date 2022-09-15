import type { Run } from "@spyrothon/api";

export default function getElapsedRunSeconds(run: Run, runnerId?: string, asOf: Date = new Date()) {
  const { actualSeconds, startedAt, pausedAt, pauseSeconds = 0, runners } = run;
  const runner = runners.find((runner) => runner.id === runnerId);

  // Individual runner has already finished, no calculation needed.
  if (runnerId != null && runner?.actualSeconds) return runner.actualSeconds;
  // All remaining times are independent of individual runners.
  // Run is fully completed, no calculation needed.
  if (actualSeconds) return actualSeconds;
  // Run is paused, calculate relative to the most recent pause time.
  if (pausedAt != null && startedAt != null)
    return (pausedAt.getTime() - startedAt.getTime()) / 1000 - pauseSeconds;
  // Run is in progress.
  if (startedAt != null) return (asOf.getTime() - startedAt.getTime()) / 1000 - pauseSeconds;

  // Run is not started.
  return 0;
}
