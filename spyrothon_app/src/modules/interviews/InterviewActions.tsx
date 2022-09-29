import { APIClient, Interview } from "@spyrothon/api";

import { SafeDispatch } from "@app/hooks/useDispatch";

import { InterviewAction, InterviewActionType } from "./InterviewTypes";

export function updateInterview(interview: Interview): InterviewAction {
  return {
    type: InterviewActionType.INTERVIEWS_UPDATE_INTERVIEW,
    interview,
  };
}

export function fetchInterviews() {
  return async (dispatch: SafeDispatch) => {
    dispatch({ type: InterviewActionType.INTERVIEWS_FETCH_INTERVIEWS_STARTED });
    const interviews = await APIClient.fetchInterviews();

    dispatch(fetchInterviewsSuccess(interviews));
  };
}

export function loadInterview(interview: Interview): InterviewAction {
  return { type: InterviewActionType.INTERVIEWS_FETCH_INTERVIEWS_SUCCESS, interviews: [interview] };
}

export function fetchInterviewsSuccess(interviews: Interview[]): InterviewAction {
  return { type: InterviewActionType.INTERVIEWS_FETCH_INTERVIEWS_SUCCESS, interviews };
}
