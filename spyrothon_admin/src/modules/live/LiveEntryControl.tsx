import * as React from "react";
import { ScheduleEntry } from "@spyrothon/api";
import {
  Button,
  Header,
  Text,
  // SelectInput,
  useSaveable,
} from "@spyrothon/uikit";

import useSafeDispatch from "@admin/hooks/useDispatch";

import * as ScheduleStore from "../../modules/schedules/ScheduleStore";
import { useSafeSelector } from "../../Store";
import OBS from "../obs/OBS";
import OBSSceneSelector from "../obs/OBSSceneSelector";
import * as RunStore from "../runs/RunStore";
// import { useOBSStore } from "../obs/OBSStore";
import { updateScheduleEntry } from "../schedules/ScheduleActions";

import styles from "./LiveEntryControl.module.css";

// const RUNNER_OBS_INPUT_NAMES = ["Ping Runner 1", "Ping Runner 2", "Ping Runner 3", "Ping Runner 4"];

// function LiveEntryRunnerSlots(props: { runId: string }) {
//   const { runId } = props;

//   const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));

//   const runnerInputs = useOBSStore((state) =>
//     RUNNER_OBS_INPUT_NAMES.map((inputName) =>
//       state.data.inputList.find((input) => input.inputName === inputName),
//     ),
//   );

//   if (run == null) return null;

//   const { runners } = run;

//   return (
//     <div>
//       <Header size={Header.Sizes.H4}>Slot Assignment</Header>
//       {RUNNER_OBS_INPUT_NAMES.map((inputName) => (
//         <SelectInput
//           key={inputName}
//           label={inputName}
//           items={runners}
//           itemToString={(runner) => runner.displayName}
//           // value={selected}
//           allowEmpty
//           emptyLabel={inputName}
//           onChange={() => null}
//         />
//       ))}
//     </div>
//   );
// }

function LiveEntryRunnerSlots(props: { runId: string }) {
  const { runId } = props;
  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));

  if (run == null) return null;

  return (
    <div>
      <Header size={Header.Sizes.H4}>Crop Data</Header>
      {run.runners.map((runner) => (
        <div key={runner.id} className={styles.runnerCropData}>
          <Text>
            <strong>{runner.displayName}:</strong>
            <br />
            {runner.gameplayIngestUrl}
            <br />
            {JSON.stringify(runner.gameplayCropTransform, undefined, 1)}
          </Text>
        </div>
      ))}
    </div>
  );
}

type LiveEntryControlProps = {
  className?: string;
};

export default function LiveEntryControl(props: LiveEntryControlProps) {
  const { className } = props;
  const dispatch = useSafeDispatch();

  const { currentEntry } = useSafeSelector((state) => ({
    currentEntry: ScheduleStore.getCurrentEntry(state),
  }));

  const [editedEntry, setEditedEntry] = React.useState<ScheduleEntry | undefined>(currentEntry);
  React.useEffect(() => setEditedEntry(currentEntry), [currentEntry]);

  const [handleSave, getSaveText] = useSaveable(async () => {
    if (editedEntry == null) return;

    dispatch(updateScheduleEntry(editedEntry));
  });

  function handleSetPreview() {
    const sceneName = editedEntry?.obsSceneName;
    if (sceneName == null) return;

    OBS.setPreviewScene(sceneName);
  }

  if (currentEntry == null || editedEntry == null) return null;

  const { obsSceneName } = editedEntry;

  return (
    <div className={className}>
      <div className={styles.form}>
        <div className={styles.flexContainer}>
          <div>
            <Header size={Header.Sizes.H4}>Current Entry</Header>
            <OBSSceneSelector
              selectedSceneName={obsSceneName}
              onChange={(scene) =>
                setEditedEntry({ ...editedEntry, obsSceneName: scene?.sceneName })
              }
            />
            <div className={styles.actions}>
              <Button onClick={handleSave}>{getSaveText()}</Button>
              <Button onClick={handleSetPreview}>Set Preview Scene</Button>
            </div>
          </div>
          {currentEntry.runId != null ? <LiveEntryRunnerSlots runId={currentEntry.runId} /> : null}
        </div>
      </div>
    </div>
  );
}
