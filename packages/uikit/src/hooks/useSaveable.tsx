import * as React from "react";

export enum SaveState {
  PENDING,
  SAVING,
  SAVED,
  FAILED,
}

export function useSaveable(
  saveFunction: () => Promise<unknown>,
  stateDuration = 2500,
): [() => void, () => React.ReactNode, SaveState] {
  const [state, setState] = React.useState<SaveState>(SaveState.PENDING);

  const handleSave = React.useCallback(() => {
    setState(SaveState.SAVING);

    saveFunction()
      .then(() => setState(SaveState.SAVED))
      .catch((error) => (console.log(error), setState(SaveState.FAILED)))
      .finally(() => setTimeout(() => setState(SaveState.PENDING), stateDuration));
  }, [saveFunction, stateDuration]);

  const getSaveText = React.useCallback(() => {
    switch (state) {
      case SaveState.SAVED:
        return "Saved!";
      case SaveState.SAVING:
        return "Saving...";
      case SaveState.FAILED:
        return <strong>Save Failed</strong>;
      default:
        return "Save Changes";
    }
  }, [state]);

  return [handleSave, getSaveText, state];
}
