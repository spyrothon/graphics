import { Interview, InterviewParticipant } from "@spyrothon/api";

import API from "@admin/API";
import { SafeDispatch } from "@admin/hooks/useDispatch";

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
    const interviews = await API.interviews.fetchInterviews();

    dispatch(fetchInterviewsSuccess(interviews));
  };
}

export function loadInterview(interview: Interview): InterviewAction {
  return { type: InterviewActionType.INTERVIEWS_FETCH_INTERVIEWS_SUCCESS, interviews: [interview] };
}

export function fetchInterviewsSuccess(interviews: Interview[]): InterviewAction {
  return { type: InterviewActionType.INTERVIEWS_FETCH_INTERVIEWS_SUCCESS, interviews };
}

export function addInterviewer(runId: string, runner: Partial<InterviewParticipant>) {
  return async (dispatch: SafeDispatch) => {
    const updatedInterview = await API.interviews.addInterviewer(runId, runner);
    dispatch({
      type: InterviewActionType.INTERVIEWS_UPDATE_INTERVIEW,
      interview: updatedInterview,
    });
  };
}

export function removeInterviewer(runId: string, interviewerId: string) {
  return async (dispatch: SafeDispatch) => {
    await API.interviews.removeInterviewer(runId, interviewerId);
    const updatedInterview = await API.interviews.fetchInterview(runId);

    dispatch({
      type: InterviewActionType.INTERVIEWS_UPDATE_INTERVIEW,
      interview: updatedInterview,
    });
  };
}

export function persistInterviewer(
  runId: string,
  interviewerId: string,
  changes: Partial<InterviewParticipant>,
) {
  return async (dispatch: SafeDispatch) => {
    const updatedInterview = await API.interviews.updateInterviewer(runId, interviewerId, changes);
    dispatch({
      type: InterviewActionType.INTERVIEWS_UPDATE_INTERVIEW,
      interview: updatedInterview,
    });
  };
}

export function addInterviewee(runId: string, runner: Partial<InterviewParticipant>) {
  return async (dispatch: SafeDispatch) => {
    const updatedInterview = await API.interviews.addInterviewee(runId, runner);
    dispatch({
      type: InterviewActionType.INTERVIEWS_UPDATE_INTERVIEW,
      interview: updatedInterview,
    });
  };
}

export function removeInterviewee(runId: string, commentatorId: string) {
  return async (dispatch: SafeDispatch) => {
    await API.interviews.removeInterviewee(runId, commentatorId);
    const updatedInterview = await API.interviews.fetchInterview(runId);

    dispatch({
      type: InterviewActionType.INTERVIEWS_UPDATE_INTERVIEW,
      interview: updatedInterview,
    });
  };
}

export function persistInterviewee(
  runId: string,
  intervieweeId: string,
  changes: Partial<InterviewParticipant>,
) {
  return async (dispatch: SafeDispatch) => {
    const updatedInterview = await API.interviews.updateInterviewee(runId, intervieweeId, changes);
    dispatch({
      type: InterviewActionType.INTERVIEWS_UPDATE_INTERVIEW,
      interview: updatedInterview,
    });
  };
}

export function persistInterview(interviewId: string, changes: Partial<Interview>) {
  return async (dispatch: SafeDispatch) => {
    const updatedInterview = await API.interviews.updateInterview(interviewId, changes);
    dispatch({
      type: InterviewActionType.INTERVIEWS_UPDATE_INTERVIEW,
      interview: updatedInterview,
    });
  };
}
