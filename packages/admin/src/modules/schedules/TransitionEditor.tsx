import * as React from "react";
import { ArrowRight, X, ChevronsUp, ChevronsDown } from "react-feather";
import {NumberInput} from "@spyrothon/uikit";

import OBSMediaSelector from "../obs/OBSMediaSelector";
import OBSSceneSelector from "../obs/OBSSceneSelector";
import OBSTransitionSelector from "../obs/OBSTransitionSelector";

import type { InitialTransition } from "@spyrothon/api";

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
    <div className={styles.container}>
      <div className={styles.drag}>
        <ChevronsUp size={24} strokeWidth="2" onClick={onMoveUp} />
        <ChevronsDown size={24} strokeWidth="2" onClick={onMoveDown} />
      </div>
      <div className={styles.content}>
        <div className={styles.transitionToScene}>
          <div className={styles.transition}>
            <OBSTransitionSelector
              note={null}
              className={styles.transitionName}
              selectedTransitionName={obsTransitionInName}
              onChange={(entry) =>
                onChange({ ...transition, obsTransitionInName: entry?.transitionName })
              }
              marginless
            />

            <NumberInput
              value={transitionDuration}
              label="Transition Duration"
              note="How long the transition animation should take. Leave blank for stingers."
              onChange={(duration) =>
                onChange({ ...transition, transitionDuration: parseInt(duration.target.value) })
              }
            />
          </div>
          <div className={styles.transitionArrow}>
            <ArrowRight size={24} strokeWidth="3" />
          </div>
          <div className={styles.scene}>
            <OBSSceneSelector
              note={null}
              className={styles.transitionScene}
              selectedSceneName={obsSceneName}
              onChange={(scene) => onChange({ ...transition, obsSceneName: scene?.sceneName })}
              marginless
            />
            {manualDuration ? (
              <NumberInput
                value={sceneDuration}
                label="Manual Scene Duration"
                note="How long the destination scene should stay up before the next transition occurs."
                onChange={(duration) =>
                  onChange({ ...transition, sceneDuration: parseInt(duration.target.value) })
                }
              />
            ) : (
              <OBSMediaSelector
                selectedMediaName={obsMediaSourceName}
                note="If given, this source will play fully before the transition continues."
                onChange={(source) =>
                  onChange({ ...transition, obsMediaSourceName: source?.inputName ?? "" })
                }
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.remove} onClick={onRemove}>
        <X size={16} strokeWidth="3" />
      </div>
    </div>
  );
}
