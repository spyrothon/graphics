import * as React from "react";
import type { Run } from "@spyrothon/api";

type RunEditorState = {
  baseRun?: Run;
  runEdits: Partial<Run>;
  hasChanges: boolean;
};

type RunEditorAction =
  | { type: "setBaseRun"; run?: Run }
  | { type: "updateField"; field: keyof Run; value: Run[keyof Run] };

function runEditorReducer(state: RunEditorState, action: RunEditorAction) {
  switch (action.type) {
    case "setBaseRun":
      return { ...state, baseRun: action.run, runEdits: {}, hasChanges: false };
    case "updateField": {
      let { ...newEdits } = state.runEdits;
      if (state.baseRun?.[action.field] !== action.value) {
        newEdits = { ...newEdits, [action.field]: action.value };
      } else {
        delete newEdits[action.field];
      }

      return { ...state, runEdits: newEdits, hasChanges: Object.keys(newEdits).length > 0 };
    }
    default:
      return state;
  }
}

export type RunEditorStateValue = {
  state: RunEditorState;
  setBaseRun: (run?: Run) => unknown;
  updateField: <F extends keyof Run>(field: F, value: Run[F]) => unknown;
  getField: <F extends keyof Run>(field: F) => Run[F] | undefined;
  getEditedRun: () => Run;
  hasChanges: () => boolean;
};

export default function useRunEditorState(): RunEditorStateValue {
  const [state, dispatch] = React.useReducer(runEditorReducer, { runEdits: {}, hasChanges: false });

  function setBaseRun(run?: Run) {
    dispatch({ type: "setBaseRun", run });
  }
  function updateField<F extends keyof Run>(field: F, value: Run[F]) {
    dispatch({ type: "updateField", field, value });
  }
  function getField<F extends keyof Run>(field: F): Run[F] | undefined {
    return (state.runEdits[field] as Run[F]) ?? state.baseRun?.[field];
  }
  function getEditedRun(): Run {
    return { ...state.baseRun, ...state.runEdits } as Run;
  }

  function hasChanges() {
    return state.hasChanges;
  }

  return {
    state,
    setBaseRun,
    updateField,
    getField,
    getEditedRun,
    hasChanges,
  };
}
