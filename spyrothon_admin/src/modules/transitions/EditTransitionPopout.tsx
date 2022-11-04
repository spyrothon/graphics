import * as React from "react";
import type { InitialTransition } from "@spyrothon/api";
import { FormControl, Stack, TextInput } from "@spyrothon/sparx";

import OBSMediaSelector from "../obs/OBSMediaSelector";
import OBSSceneSelector from "../obs/OBSSceneSelector";
import OBSTransitionSelector from "../obs/OBSTransitionSelector";

import styles from "./EditTransitionPopout.module.css";

interface EditTransitionPopoutProps {
  transition: InitialTransition;
  onChange: (transition: InitialTransition) => void;
}

export default function EditTransitionPopout(props: EditTransitionPopoutProps) {
  const { transition, onChange } = props;
  const {
    sceneDuration,
    obsTransitionInName,
    obsSceneName,
    obsMediaSourceName,
    transitionDuration,
  } = transition;

  const [manualDuration, setManualDuration] = React.useState(sceneDuration != null);

  React.useEffect(() => {
    if (sceneDuration != null) setManualDuration(true);
  }, [sceneDuration]);

  return (
    <Stack className={styles.content}>
      <OBSTransitionSelector
        note={null}
        selectedTransitionName={obsTransitionInName}
        onSelect={(entry) =>
          onChange({ ...transition, obsTransitionInName: entry?.transitionName })
        }
      />

      <FormControl
        label="Transition Duration"
        note="How long the transition animation should take. Leave blank for stingers.">
        <TextInput
          type="number"
          value={transitionDuration}
          onChange={(duration) =>
            onChange({ ...transition, transitionDuration: parseInt(duration.target.value) })
          }
        />
      </FormControl>
      <OBSSceneSelector
        note={null}
        selectedSceneName={obsSceneName}
        onSelect={(scene) => onChange({ ...transition, obsSceneName: scene?.sceneName })}
      />
      {manualDuration ? (
        <FormControl
          label="Manual Scene Duration"
          note="How long the destination scene should stay up before the next transition occurs.">
          <TextInput
            type="number"
            value={sceneDuration}
            onChange={(duration) =>
              onChange({ ...transition, sceneDuration: parseInt(duration.target.value) })
            }
          />
        </FormControl>
      ) : (
        <OBSMediaSelector
          selectedMediaName={obsMediaSourceName}
          note="If given, this source will play fully before the transition continues."
          onSelect={(source) =>
            onChange({ ...transition, obsMediaSourceName: source?.inputName ?? "" })
          }
        />
      )}
    </Stack>
  );
}
