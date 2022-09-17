import * as React from "react";
import classNames from "classnames";
import { Header, Text } from "@spyrothon/uikit";

import OBS from "../obs/OBS";
import { useOBSStore } from "../obs/OBSStore";

import styles from "./LiveOBSStatus.module.css";

function VolumeMeters() {
  const audioInputStates = useOBSStore((state) => {
    const inputs = [];
    const inputStates = state.data.inputStates;
    for (const inputName in inputStates) {
      if (inputStates[inputName].inputVolumeMul !== undefined) {
        inputs.push({ inputName, ...inputStates[inputName] });
      }
    }
    return inputs.sort((a, b) => a.inputName.localeCompare(b.inputName));
  });

  return (
    <div>
      {audioInputStates.map((state) => (
        <div
          key={state.inputName}
          className={styles.volumeMeter}
          aria-disabled={!state.videoActive}>
          <label className={styles.volumeMeterName}>{state.inputName}</label>
          <br />
          <input
            className={styles.volumeMeterBar}
            type="range"
            min="-100"
            max="0"
            value={state.inputVolumeDb}
            onChange={(event) => OBS.setInputVolume(state.inputName, parseInt(event.target.value))}
          />
        </div>
      ))}
    </div>
  );
}

export default function LiveOBSStatus(props: { className?: string }) {
  const { className } = props;

  const { currentPreviewSceneName, currentProgramSceneName, transitionInProgress } = useOBSStore(
    (state) => state.data,
  );

  return (
    <div className={classNames(styles.container, className)}>
      <Header size={Header.Sizes.H4}>OBS Monitor</Header>
      <Text>{transitionInProgress ? "Transition in Progress" : "Static"}</Text>
      <div className={styles.currentScenes}>
        <Text>
          <strong>Now Showing:</strong>
          <br />
          {currentProgramSceneName}
        </Text>
        <Text>
          <strong>On Preview:</strong>
          <br />
          {currentPreviewSceneName}
        </Text>
      </div>

      <VolumeMeters />
    </div>
  );
}
