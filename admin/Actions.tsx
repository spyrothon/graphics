import { AuthAction, AuthActionType } from "./modules/auth/AuthTypes";
import { InterviewAction, InterviewActionType } from "./modules/interviews/InterviewTypes";
import { PublishingAction, PublishingActionType } from "./modules/publishing/PublishingTypes";
import { RemoteAction, RemoteActionType } from "./modules/remote/RemoteTypes";
import { RunAction, RunActionType } from "./modules/runs/RunsTypes";
import { ScheduleAction, ScheduleActionType } from "./modules/schedules/ScheduleTypes";

export const ActionTypes = {
  ...AuthActionType,
  ...InterviewActionType,
  ...PublishingActionType,
  ...RemoteActionType,
  ...RunActionType,
  ...ScheduleActionType,
};

export type Action =
  | { type: "@@INIT" }
  | AuthAction
  | InterviewAction
  | PublishingAction
  | RemoteAction
  | RunAction
  | ScheduleAction;

export type ActionFor<T extends keyof typeof ActionTypes> = Extract<
  Action,
  {
    type: T;
  }
>;
