import { Interview } from "@spyrothon/api";

export enum InterviewActionType {
  INTERVIEWS_UPDATE_INTERVIEW = "INTERVIEWS_UPDATE_INTERVIEW",
  INTERVIEWS_FETCH_INTERVIEWS_STARTED = "INTERVIEWS_FETCH_INTERVIEWS_STARTED",
  INTERVIEWS_FETCH_INTERVIEWS_SUCCESS = "INTERVIEWS_FETCH_INTERVIEWS_SUCCESS",
}

export type InterviewAction =
  | {
      type: InterviewActionType.INTERVIEWS_UPDATE_INTERVIEW;
      interview: Interview;
    }
  | { type: InterviewActionType.INTERVIEWS_FETCH_INTERVIEWS_STARTED }
  | {
      type: InterviewActionType.INTERVIEWS_FETCH_INTERVIEWS_SUCCESS;
      interviews: Interview[];
    };
