import { Interview } from "@spyrothon/api";

import { Action,ActionFor } from "../../Actions";
import { InterviewActionType } from "./InterviewTypes";

type InterviewMap = { [id: string]: Interview };

type InterviewReducerState = {
  fetching: boolean;
  interviews: InterviewMap;
};

function handleUpdateInterview(
  state: InterviewReducerState,
  action: ActionFor<InterviewActionType.INTERVIEWS_UPDATE_INTERVIEW>,
) {
  const { interview } = action;

  return {
    ...state,
    interviews: {
      ...state.interviews,
      [interview.id]: interview,
    },
  };
}

function handleFetchInterviewsStarted(
  state: InterviewReducerState,
  _action: ActionFor<InterviewActionType.INTERVIEWS_FETCH_INTERVIEWS_STARTED>,
) {
  return {
    ...state,
    fetching: true,
  };
}

function handleFetchInterviewsSuccess(
  state: InterviewReducerState,
  action: ActionFor<InterviewActionType.INTERVIEWS_FETCH_INTERVIEWS_SUCCESS>,
) {
  const { interviews } = action;
  const interviewsById = interviews.reduce<InterviewMap>((acc, interview) => {
    acc[interview.id] = interview;
    return acc;
  }, {});

  return {
    ...state,
    fetching: false,
    interviews: { ...state.interviews, ...interviewsById },
  };
}

const defaultState: InterviewReducerState = {
  fetching: false,
  interviews: {},
};

export default function runsReducer(
  state: InterviewReducerState = defaultState,
  action: Action,
): InterviewReducerState {
  switch (action.type) {
    case InterviewActionType.INTERVIEWS_UPDATE_INTERVIEW:
      return handleUpdateInterview(state, action);
    case InterviewActionType.INTERVIEWS_FETCH_INTERVIEWS_STARTED:
      return handleFetchInterviewsStarted(state, action);
    case InterviewActionType.INTERVIEWS_FETCH_INTERVIEWS_SUCCESS:
      return handleFetchInterviewsSuccess(state, action);
  }

  return state;
}
