import { Interview, Participant, Run, Schedule } from "../APITypes";

export type SyncSocketMessage =
  | { type: "ping" }
  | { type: "refresh_runs" }
  | { type: "refresh_interviews" }
  | { type: "load_schedule"; schedule: Schedule }
  | { type: "load_run"; run: Run }
  | { type: "load_interview"; interview: Interview }
  | { type: "load_participant"; participant: Participant }
  | { type: "obs_transition_started"; setId: string; transitionId: string }
  | { type: "obs_transition_finished"; setId: string; transitionId: string }
  | { type: "obs_transition_reset"; setId: string; transitionId: string };
