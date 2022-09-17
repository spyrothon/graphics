import { InterviewAction, InterviewActionType } from "./modules/interviews/InterviewTypes";
import { RunAction, RunActionType } from "./modules/runs/RunsTypes";
import { ScheduleAction, ScheduleActionType } from "./modules/schedules/ScheduleTypes";

export const ActionTypes = {
  ...InterviewActionType,
  ...RunActionType,
  ...ScheduleActionType,
};

export type Action =
  | { type: "@@INIT" }
  | InterviewAction
  | RunAction
  | ScheduleAction;

export type ActionFor<T extends keyof typeof ActionTypes> = Extract<
  Action,
  {
    type: T;
  }
>;
