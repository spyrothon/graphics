import * as React from "react";
import { v4 as uuid } from "uuid";
import {
  InitialScheduleEntry,
  InitialTransition,
  InitialTransitionSet,
  ScheduleEntry,
} from "@spyrothon/api";
import { Button, Card, DurationInput, FormControl, Header, Stack } from "@spyrothon/sparx";
import { SaveState, useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";

import OBSSceneSelector from "../obs/OBSSceneSelector";
import { updateScheduleEntry } from "./ScheduleActions";
import TransitionEditor from "./TransitionEditor";

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
    <div>
      <Stack spacing="space-lg">
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!hasChanges || saveState === SaveState.SAVING}>
          {getSaveText()}
        </Button>
        <Card>
          <Stack direction="horizontal" spacing="space-lg" justify="stretch">
            <Stack>
              <Header tag="h2">Timing</Header>
              <FormControl label="Estimated Setup Time">
                <DurationInput
                  value={editedEntry.setupSeconds}
                  onChange={(value) => setEditedEntry({ ...editedEntry, setupSeconds: value })}
                />
              </FormControl>
            </Stack>

            <Stack>
              <Header tag="h2">OBS Scene Setup</Header>
              <OBSSceneSelector
                selectedSceneName={editedEntry.obsSceneName}
                note="Name of the scene to use for this run in OBS."
                onSelect={(scene) =>
                  setEditedEntry({ ...editedEntry, obsSceneName: scene?.sceneName })
                }
              />
            </Stack>
          </Stack>
        </Card>

        <Stack spacing="space-lg">
          <Stack direction="horizontal" justify="space-between">
            <Header tag="h2">Enter Transition</Header>
            <Button variant="primary" onClick={() => addTransition("enterTransitionSet")}>
              Add Transition
            </Button>
          </Stack>
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
          <Stack direction="horizontal" justify="space-between">
            <Header tag="h2">Exit Transition</Header>
            <Button variant="primary" onClick={() => addTransition("exitTransitionSet")}>
              Add Transition
            </Button>
          </Stack>
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
        </Stack>
      </Stack>
    </div>
  );
}
