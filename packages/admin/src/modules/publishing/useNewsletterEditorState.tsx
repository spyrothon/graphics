import * as React from "react";
import {v4 as uuid} from 'uuid';
import type { InitialPublication, Newsletter, Publication } from "@spyrothon/api";

type NewsletterEditorState = {
  baseNewsletter?: Newsletter;
  edits: Partial<Newsletter>;
  hasChanges: boolean;
};

type NewsletterEditorAction =
  | { type: "setBaseNewsletter"; newsletter?: Newsletter }
  | { type: "updateField"; field: keyof Newsletter; value: Newsletter[keyof Newsletter] };

function newsletterEditorReducer(state: NewsletterEditorState, action: NewsletterEditorAction) {
  switch (action.type) {
    case "setBaseNewsletter":
      return {
        ...state,
        baseNewsletter: action.newsletter,
        edits: {},
        hasChanges: false,
      };
    case "updateField": {
      let { ...newEdits } = state.edits;
      if (state.baseNewsletter?.[action.field] !== action.value) {
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

export type NewsletterEditorsStateValue = {
  state: NewsletterEditorState;
  setBaseNewsletter: (newsletter?: Newsletter) => unknown;
  updateField<F extends keyof Newsletter>(field: F, value: Newsletter[F]): unknown;
  getField<F extends keyof Newsletter>(field: F): Newsletter[F] | undefined;
  updatePublication(publication: InitialPublication, index: number): unknown;
  addPublication(): unknown;
  removePublication(index: number): unknown;
  getEditedNewsletter: () => Newsletter;
  hasChanges: () => boolean;
};

export default function useNewsletterEditorState(): NewsletterEditorsStateValue {
  const [state, dispatch] = React.useReducer(newsletterEditorReducer, {
    edits: {},
    hasChanges: false,
  });

  function setBaseNewsletter(newsletter?: Newsletter) {
    dispatch({ type: "setBaseNewsletter", newsletter });
  }
  function updateField<F extends keyof Newsletter>(field: F, value: Newsletter[F]) {
    dispatch({ type: "updateField", field, value });
  }
  function getField<F extends keyof Newsletter>(
    field: F,
    defaultValue: Newsletter[F] | undefined = undefined,
  ): Newsletter[F] | undefined {
    return (state.edits[field] as Newsletter[F]) ?? state.baseNewsletter?.[field] ?? defaultValue;
  }
  function updatePublication(newPublication: InitialPublication, index: number) {
    const publications = getField("publications") ?? [];
    publications[index] = newPublication as Publication;
    updateField("publications", publications);
  }

  function removePublication(index: number) {
    const publications = getField("publications") ?? [];
    publications.splice(index, 1);
    updateField("publications", publications);
  }

  function addPublication() {
    const publications = Array.from(getField("publications") ?? []);
    publications.push({ id: uuid() } as Publication);
    updateField("publications", publications);
  }
  function getEditedNewsletter(): Newsletter {
    return { ...state.baseNewsletter, ...state.edits } as Newsletter;
  }

  function hasChanges() {
    return state.hasChanges;
  }

  return {
    state,
    setBaseNewsletter,
    updateField,
    getField,
    updatePublication,
    removePublication,
    addPublication,
    getEditedNewsletter,
    hasChanges,
  };
}
