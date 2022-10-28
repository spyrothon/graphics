import * as React from "react";
import { ArrowRight, ChevronsDown, ChevronsUp, X } from "react-feather";
import type { InitialTransition } from "@spyrothon/api";
import { Card, FormControl, Stack, TextInput } from "@spyrothon/sparx";

import OBSMediaSelector from "../obs/OBSMediaSelector";
import OBSSceneSelector from "../obs/OBSSceneSelector";
import OBSTransitionSelector from "../obs/OBSTransitionSelector";

import styles from "./TransitionEditor.module.css";

interface TransitionEditorProps {
  transition: InitialTransition;
  onChange: (transition: InitialTransition) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function TransitionEditor(props: TransitionEditorProps) {
  const { transition, onChange, onRemove, onMoveUp, onMoveDown } = props;
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
    <Card className={styles.container}>
      <Stack direction="horizontal" className={styles.flex}>
        <div className={styles.drag}>
          <ChevronsUp size={24} strokeWidth="2" onClick={onMoveUp} />
          <ChevronsDown size={24} strokeWidth="2" onClick={onMoveDown} />
        </div>
        <Stack className={styles.content}>
          <div className={styles.transitionToScene}>
            <div className={styles.transition}>
              <OBSTransitionSelector
                note={null}
                className={styles.transitionName}
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
            </div>
            <div className={styles.transitionArrow}>
              <ArrowRight size={24} strokeWidth="3" />
            </div>
            <div className={styles.scene}>
              <OBSSceneSelector
                note={null}
                className={styles.transitionScene}
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
            </div>
          </div>
        </Stack>

        <div className={styles.remove} onClick={onRemove}>
          <X size={16} strokeWidth="3" />
        </div>
      </Stack>
    </Card>
  );
}
