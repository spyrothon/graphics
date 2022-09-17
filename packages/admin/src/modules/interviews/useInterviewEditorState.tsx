import * as React from "react";
import { Interview, InterviewQuestion,RunParticipant } from "@spyrothon/api";

type InterviewEditorState = {
  base?: Interview;
  edits: Partial<Interview>;
  hasChanges: boolean;
};

type RunEditorAction =
  | { type: "setBase"; interview?: Interview }
  | { type: "updateField"; field: keyof Interview; value: Interview[keyof Interview] };

function runEditorReducer(state: InterviewEditorState, action: RunEditorAction) {
  switch (action.type) {
    case "setBase":
      return { ...state, base: action.interview, edits: {}, hasChanges: false };
    case "updateField": {
      let { ...newEdits } = state.edits;
      if (state.base?.[action.field] !== action.value) {
        newEdits = { ...newEdits, [action.field]: action.value };
      } else {
        delete newEdits[action.field];
      }

      return { ...state, edits: newEdits, hasChanges: Object.keys(newEdits).length > 0 };
    }
    default:
      return state;
  }
}

export type InterviewEditorStateValue = {
  state: InterviewEditorState;
  setBase: (Interview?: Interview) => unknown;
  updateField: <F extends keyof Interview>(field: F, value: Interview[F]) => unknown;
  getField: <F extends keyof Interview>(field: F) => Interview[F] | undefined;
  updateParticipantField: <F extends keyof RunParticipant>(
    type: "interviewers" | "interviewees",
    index: number,
    field: F,
    value: RunParticipant[F],
  ) => unknown;
  getParticipantField: <F extends keyof RunParticipant>(
    type: "interviewers" | "interviewees",
    index: number,
    field: F,
  ) => RunParticipant[F] | undefined;
  updateQuestionField: <F extends keyof InterviewQuestion>(
    index: number,
    field: F,
    value: InterviewQuestion[F],
  ) => unknown;
  getQuestionField: <F extends keyof InterviewQuestion>(
    index: number,
    field: F,
  ) => InterviewQuestion[F] | undefined;
  getEditedInterview: () => Interview;
  hasChanges: () => boolean;
};

export default function useInterviewEditorState(): InterviewEditorStateValue {
  const [state, dispatch] = React.useReducer(runEditorReducer, { edits: {}, hasChanges: false });

  function setBase(interview?: Interview) {
    dispatch({ type: "setBase", interview });
  }
  function updateField<F extends keyof Interview>(field: F, value: Interview[F]) {
    dispatch({ type: "updateField", field, value });
  }
  function getField<F extends keyof Interview>(field: F): Interview[F] | undefined {
    return (state.edits[field] as Interview[F]) ?? state.base?.[field];
  }
  function updateParticipantField<F extends keyof RunParticipant>(
    type: "interviewers" | "interviewees",
    index: number,
    field: F,
    value: RunParticipant[F],
  ) {
    const list = Array.from(getField(type) ?? []);

    if (list[index] == null) {
      list[index] = {
        displayName: "",
        twitchName: "",
        twitterName: "",
        hasWebcam: false,
        visible: true,
      } as RunParticipant;
    }
    list[index][field] = value;
    dispatch({ type: "updateField", field: type, value: list });
  }
  function getParticipantField<F extends keyof RunParticipant>(
    type: "interviewers" | "interviewees",
    index: number,
    field: F,
  ): RunParticipant[F] | undefined {
    const runner = getField(type)?.[index];
    return runner?.[field];
  }
  function updateQuestionField<F extends keyof InterviewQuestion>(
    index: number,
    field: F,
    value: InterviewQuestion[F],
  ) {
    const list = Array.from(getField("questions") ?? []);

    if (list[index] == null) {
      list[index] = {
        question: "",
      } as InterviewQuestion;
    }
    list[index][field] = value;
    dispatch({ type: "updateField", field: "questions", value: list });
  }
  function getQuestionField<F extends keyof InterviewQuestion>(
    index: number,
    field: F,
  ): InterviewQuestion[F] | undefined {
    const runner = getField("questions")?.[index];
    return runner?.[field];
  }
  function getEditedInterview(): Interview {
    return { ...state.base, ...state.edits } as Interview;
  }

  function hasChanges() {
    return state.hasChanges;
  }

  return {
    state,
    setBase,
    updateField,
    getField,
    updateParticipantField,
    getParticipantField,
    updateQuestionField,
    getQuestionField,
    getEditedInterview,
    hasChanges,
  };
}
