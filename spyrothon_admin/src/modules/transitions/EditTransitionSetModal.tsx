import * as React from "react";
import { ChevronsDown, ChevronsUp, X } from "react-feather";
import { v4 as uuid } from "uuid";
import { InitialTransition, Transition, TransitionSet } from "@spyrothon/api";
import { Button, Card, FormControl, Header, Spacer, Stack, TextInput } from "@spyrothon/sparx";
import { useSaveable } from "@spyrothon/utils";

import TransitionText from "../live/TransitionText";
import OBSMediaSelector from "../obs/OBSMediaSelector";
import OBSSceneSelector from "../obs/OBSSceneSelector";
import OBSTransitionSelector from "../obs/OBSTransitionSelector";

import styles from "./EditTransitionSetModal.module.css";

interface TransitionEditorProps {
  transition: InitialTransition;
  onChange: (transition: InitialTransition) => void;
  onReorder: (direction: "up" | "down") => void;
  onRemove: () => void;
}

function TransitionEditor(props: TransitionEditorProps) {
  const { transition, onChange, onReorder, onRemove } = props;

  function handleReorder(event: React.SyntheticEvent, direction: "up" | "down") {
    onReorder(direction);
  }

  return (
    <Card>
      <Stack direction="horizontal">
        <div className={styles.drag}>
          <ChevronsUp size={24} strokeWidth="2" onClick={(event) => handleReorder(event, "up")} />
          <ChevronsDown
            size={24}
            strokeWidth="2"
            onClick={(event) => handleReorder(event, "down")}
          />
        </div>
        <TransitionText className={styles.transitionText} transition={transition as Transition} />
        <Stack align="end" className={styles.remove}>
          <Button variant="link" onClick={onRemove}>
            <X size={16} strokeWidth="3" />
          </Button>
        </Stack>
      </Stack>
      <Stack className={styles.content}>
        <OBSTransitionSelector
          note={null}
          selectedTransitionName={transition.obsTransitionInName}
          onSelect={(entry) =>
            onChange({ ...transition, obsTransitionInName: entry?.transitionName ?? "" })
          }
        />
        <FormControl
          label="Transition Duration"
          note="How long the transition animation should take. Leave blank for stingers.">
          <TextInput
            type="number"
            value={transition.transitionDuration}
            onChange={(duration) =>
              onChange({ ...transition, transitionDuration: parseInt(duration.target.value) })
            }
          />
        </FormControl>
        <OBSSceneSelector
          note={null}
          selectedSceneName={transition.obsSceneName}
          onSelect={(scene) => onChange({ ...transition, obsSceneName: scene?.sceneName ?? "" })}
        />
        <OBSMediaSelector
          selectedMediaName={transition.obsMediaSourceName}
          note="If given, this source will play fully before the transition continues."
          onSelect={(source) =>
            onChange({ ...transition, obsMediaSourceName: source?.inputName ?? "" })
          }
        />
      </Stack>
    </Card>
  );
}

interface EditTransitionSetModalProps {
  title: string;
  transitionSet: TransitionSet;
  onSave: (transitionSet: TransitionSet) => void;
}

export default function EditTransitionSetModal(props: EditTransitionSetModalProps) {
  const { title, transitionSet, onSave } = props;

  const [editedSet, setEditedSet] = React.useState<TransitionSet>(() => ({
    ...transitionSet,
  }));

  const [handleSave, getSaveText] = useSaveable(async () => {
    onSave(editedSet);
  });

  function setTransitionSet(set: TransitionSet) {
    setEditedSet(set);
  }

  function updateTransition(transition: Partial<Transition>, index: number) {
    const updatedTransitions = Array.from(editedSet.transitions);
    updatedTransitions.splice(index, 1, transition as Transition);
    setTransitionSet({ ...editedSet, transitions: updatedTransitions });
  }

  function removeTransition(index: number) {
    const updatedTransitions = [...editedSet.transitions];
    updatedTransitions.splice(index, 1);
    setTransitionSet({ ...editedSet, transitions: updatedTransitions });
  }

  function addTransition() {
    setTransitionSet({
      ...editedSet,
      transitions: [...editedSet.transitions, { id: uuid() } as Transition],
    });
  }

  function reorderTransitions(direction: "up" | "down", index: number) {
    const transitions = Array.from(editedSet.transitions ?? []);
    const [item] = transitions.splice(index, 1);
    switch (direction) {
      case "up":
        transitions.splice(index - 1, 0, item);
        break;
      case "down":
        transitions.splice(index + 1, 0, item);
        break;
    }

    setTransitionSet({ ...editedSet, transitions });
  }

  return (
    <Card floating className={styles.container}>
      <Stack spacing="space-lg">
        <Stack direction="horizontal" justify="space-between">
          <Header tag="h2">{title}</Header>
          <Button variant="primary" onClick={addTransition}>
            Add Transition
          </Button>
        </Stack>
        <Stack spacing="space-sm">
          {editedSet.transitions.map((transition, index) => (
            <TransitionEditor
              key={transition.id}
              transition={transition}
              onReorder={(direction) => reorderTransitions(direction, index)}
              onRemove={() => removeTransition(index)}
              onChange={(transition) => updateTransition(transition, index)}
            />
          ))}
        </Stack>
        <Spacer />
        <Button variant="primary" onClick={handleSave}>
          {getSaveText()}
        </Button>
      </Stack>
    </Card>
  );
}
