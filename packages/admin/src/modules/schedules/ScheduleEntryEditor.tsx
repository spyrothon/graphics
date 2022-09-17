import * as React from "react";
import { v4 as uuid } from "uuid";
import {
  InitialScheduleEntry,
  InitialTransition,
  InitialTransitionSet,
  ScheduleEntry,
} from "@spyrothon/api";
import { Button, DurationInput, Header, SaveState,useSaveable } from "@spyrothon/uikit";

import useSafeDispatch from "@admin/hooks/useDispatch";

import OBSSceneSelector from "../obs/OBSSceneSelector";
import { updateScheduleEntry } from "./ScheduleActions";
import TransitionEditor from "./TransitionEditor";

import styles from "./ScheduleEntryEditor.module.css";

interface ScheduleEntryEditorProps {
  scheduleEntry: ScheduleEntry;
}

export default function ScheduleEntryEditor(props: ScheduleEntryEditorProps) {
  const { scheduleEntry } = props;

  const dispatch = useSafeDispatch();
  const [editedEntry, setEditedEntry] = React.useState<InitialScheduleEntry>(scheduleEntry);
  const hasChanges = JSON.stringify(editedEntry) !== JSON.stringify(scheduleEntry);

  React.useEffect(() => setEditedEntry(scheduleEntry), [scheduleEntry]);

  const [handleSave, getSaveText, saveState] = useSaveable(async () =>
    dispatch(updateScheduleEntry(editedEntry as ScheduleEntry)),
  );

  function updateTransition(
    kind: "enterTransitionSet" | "exitTransitionSet",
    newTransition: InitialTransition,
    index: number,
  ) {
    const set = editedEntry[kind] ?? ({} as InitialTransitionSet);
    const transitions = Array.from(set.transitions ?? []);
    transitions[index] = newTransition;
    setEditedEntry({ ...editedEntry, [kind]: { ...set, transitions } });
  }

  function removeTransition(kind: "enterTransitionSet" | "exitTransitionSet", index: number) {
    const set = editedEntry[kind] ?? ({} as InitialTransitionSet);
    const transitions = Array.from(set.transitions ?? []);
    transitions.splice(index, 1);
    setEditedEntry({ ...editedEntry, [kind]: { ...set, transitions } });
  }

  function addTransition(kind: "enterTransitionSet" | "exitTransitionSet") {
    const set = editedEntry[kind] ?? ({} as InitialTransitionSet);
    const transitions = Array.from(set.transitions ?? []);
    transitions.push({ id: uuid() });
    setEditedEntry({ ...editedEntry, [kind]: { ...set, transitions } });
  }

  function reorderTransitions(
    kind: "enterTransitionSet" | "exitTransitionSet",
    direction: "up" | "down",
    index: number,
  ) {
    const set = editedEntry[kind] ?? ({} as InitialTransitionSet);
    const transitions = Array.from(set.transitions ?? []);
    const [item] = transitions.splice(index, 1);
    switch (direction) {
      case "up":
        transitions.splice(index - 1, 0, item);
        break;
      case "down":
        transitions.splice(index + 1, 0, item);
        break;
    }
    setEditedEntry({ ...editedEntry, [kind]: { ...set, transitions } });
  }

  return (
    <div className={styles.container}>
      <Button
        className={styles.saveButton}
        onClick={handleSave}
        disabled={!hasChanges || saveState === SaveState.SAVING}>
        {getSaveText()}
      </Button>
      <div className={styles.editor}>
        <div>
          <Header className={styles.header}>Timing</Header>
          <DurationInput
            label="Estimated Setup Time"
            value={editedEntry.setupSeconds}
            onChange={(value) => setEditedEntry({ ...editedEntry, setupSeconds: value })}
          />

          <Header className={styles.header}>OBS Scene Setup</Header>
          <OBSSceneSelector
            selectedSceneName={editedEntry.obsSceneName}
            note="Name of the scene to use for this run in OBS."
            onChange={(scene) => setEditedEntry({ ...editedEntry, obsSceneName: scene?.sceneName })}
          />
        </div>

        <div className={styles.transitions}>
          <Header className={styles.header}>
            Enter Transition
            <Button
              className={styles.addTransitionButton}
              onClick={() => addTransition("enterTransitionSet")}>
              Add Transition
            </Button>
          </Header>
          {editedEntry.enterTransitionSet?.transitions.map((transition, index) => (
            <TransitionEditor
              key={transition.id}
              onMoveUp={() => reorderTransitions("enterTransitionSet", "up", index)}
              onMoveDown={() => reorderTransitions("enterTransitionSet", "down", index)}
              transition={transition}
              onChange={(transition) => updateTransition("enterTransitionSet", transition, index)}
              onRemove={() => removeTransition("enterTransitionSet", index)}
            />
          ))}
          <Header className={styles.header}>
            Exit Transition
            <Button
              className={styles.addTransitionButton}
              onClick={() => addTransition("exitTransitionSet")}>
              Add Transition
            </Button>
          </Header>
          {editedEntry.exitTransitionSet?.transitions.map((transition, index) => (
            <TransitionEditor
              key={transition.id}
              onMoveUp={() => reorderTransitions("exitTransitionSet", "up", index)}
              onMoveDown={() => reorderTransitions("exitTransitionSet", "down", index)}
              transition={transition}
              onChange={(transition) => updateTransition("exitTransitionSet", transition, index)}
              onRemove={() => removeTransition("exitTransitionSet", index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
