import * as React from "react";
import { ScheduleEntry, TransitionSet } from "@spyrothon/api";
import {
  Button,
  Card,
  DurationInput,
  FormControl,
  Header,
  openModal,
  Stack,
} from "@spyrothon/sparx";
import { SaveState, useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";

import TransitionText from "../live/TransitionText";
import OBSSceneSelector from "../obs/OBSSceneSelector";
import EditTransitionSetModal from "../transitions/EditTransitionSetModal";
import { updateTransitionSet } from "../transitions/TransitionActions";
import { updateScheduleEntry } from "./ScheduleActions";

interface ScheduleEntryEditorProps {
  scheduleEntry: ScheduleEntry;
}

export default function ScheduleEntryEditor(props: ScheduleEntryEditorProps) {
  const { scheduleEntry } = props;

  const dispatch = useSafeDispatch();
  const [editedEntry, setEditedEntry] = React.useState<ScheduleEntry>(scheduleEntry);
  const hasChanges = JSON.stringify(editedEntry) !== JSON.stringify(scheduleEntry);

  React.useEffect(() => setEditedEntry(scheduleEntry), [scheduleEntry]);

  const [handleSave, getSaveText, saveState] = useSaveable(async () =>
    dispatch(updateScheduleEntry(editedEntry as ScheduleEntry)),
  );

  function openEditTransitionSetModal(transitionSet: TransitionSet, title: string) {
    openModal((props) => (
      <EditTransitionSetModal
        title={title}
        transitionSet={transitionSet}
        onSave={async (set) => {
          await updateTransitionSet(transitionSet.id, set);
          props.onClose();
        }}
      />
    ));
  }

  return (
    <Stack direction="horizontal" spacing="space-lg" justify="stretch" align="start">
      <Card>
        <Stack spacing="space-lg">
          <Header tag="h2">Entry Setup</Header>
          <FormControl label="Estimated Setup Time">
            <DurationInput
              value={editedEntry.setupSeconds}
              onChange={(value) => setEditedEntry({ ...editedEntry, setupSeconds: value })}
            />
          </FormControl>
          <OBSSceneSelector
            selectedSceneName={editedEntry.obsSceneName}
            note="Name of the scene to use for this run in OBS."
            onSelect={(scene) => setEditedEntry({ ...editedEntry, obsSceneName: scene?.sceneName })}
          />
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!hasChanges || saveState === SaveState.SAVING}>
            {getSaveText()}
          </Button>
        </Stack>
      </Card>
      <Stack spacing="space-lg">
        <Header tag="h2">Transitions</Header>
        <Card>
          <Stack spacing="space-lg">
            <Button
              onClick={() =>
                openEditTransitionSetModal(editedEntry.enterTransitionSet, "Edit Enter Transitions")
              }>
              Edit Enter Transitions
            </Button>
            <div>
              {editedEntry.enterTransitionSet.transitions.map((transition) => (
                <TransitionText key={transition.id} transition={transition} />
              ))}
            </div>
          </Stack>
        </Card>
        <Card>
          <Stack spacing="space-lg">
            <Button
              onClick={() =>
                openEditTransitionSetModal(editedEntry.exitTransitionSet, "Edit Exit Transitions")
              }>
              Edit Exit Transitions
            </Button>
            <div>
              {editedEntry.exitTransitionSet.transitions.map((transition) => (
                <TransitionText key={transition.id} transition={transition} />
              ))}
            </div>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}
