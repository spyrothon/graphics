import * as React from "react";
import {
  Button,
  Card,
  ConfirmModal,
  FormControl,
  FormSwitch,
  Header,
  openModal,
  Stack,
  Text,
  TextInput,
} from "@spyrothon/sparx";
import { useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";
import { useSafeSelector } from "@admin/Store";

import { persistRunner, removeRunner } from "./RunActions";
import * as RunStore from "./RunStore";

import styles from "./RunnerPopout.module.css";

export interface RunnerPopoutProps {
  runId: string;
  runnerId: string;
}

export default function RunnerPopout(props: RunnerPopoutProps) {
  const dispatch = useSafeDispatch();
  const { runId, runnerId } = props;

  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  const runner = run.runners.find((runner) => runner.id === runnerId)!;

  const [displayName, setDisplayName] = React.useState(runner.displayName);
  const [showWebcam, setShowWebcam] = React.useState(false);
  const [gameplayIngestURL, setGameplayIngestURL] = React.useState(runner.gameplayIngestUrl);
  const [webcamIngestURL, setWebcamIngestURL] = React.useState(runner.webcamIngestUrl);

  const [save, getSaveText] = useSaveable(async () => {
    dispatch(persistRunner(runId, runnerId, { displayName }));
  });

  function handleRemove() {
    function remove() {
      dispatch(removeRunner(runId, runnerId));
    }

    openModal((props) => (
      <ConfirmModal
        {...props}
        title="Remove Runner"
        body={`Removing ${
          runner.displayName ?? runner.participant.displayName
        } will remove all information about them and cannot be undone.`}
        onConfirm={remove}
        onCancel={props.onClose}
      />
    ));
  }

  return (
    <Card level={1} className={styles.container}>
      <Stack spacing="space-lg">
        <Stack direction="horizontal" justify="space-between" align="center">
          <Stack spacing="space-none">
            <Header tag="h1" variant="header-md/normal">
              {runner.participant.displayName}
            </Header>
            <Text variant="text-sm/secondary">Runner</Text>
          </Stack>
          <Button variant="primary/outline" onClick={() => null}>
            Edit Participant
          </Button>
        </Stack>
        <Stack spacing="space-md">
          <FormControl label="Display Name Override">
            <TextInput
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </FormControl>
          <FormSwitch
            label="Show Webcam"
            checked={showWebcam}
            disabled={!runner.participant.hasWebcam}
            note={
              runner.participant.hasWebcam
                ? undefined
                : `${runner.participant.displayName} doesn't have a webcam input configured`
            }
            onChange={(event) => setShowWebcam(event.target.checked)}
          />
        </Stack>
        <Stack spacing="space-md">
          <FormControl label="Gameplay Ingest URL">
            <TextInput
              value={gameplayIngestURL}
              onChange={(event) => setGameplayIngestURL(event.target.value)}
            />
          </FormControl>
          <FormControl label="Gameplay Crop Data" note="Enter as Top, Right, Bottom, Left">
            <Stack direction="horizontal" spacing="space-sm" wrap={false}>
              <TextInput type="number" value={0} />
              <TextInput type="number" value={0} />
              <TextInput type="number" value={0} />
              <TextInput type="number" value={0} />
            </Stack>
          </FormControl>
        </Stack>
        <Stack spacing="space-md">
          <FormControl label="Webcam Ingest URL">
            <TextInput
              value={webcamIngestURL}
              onChange={(event) => setWebcamIngestURL(event.target.value)}
            />
          </FormControl>
          <FormControl label="Webcam Crop Data" note="Enter as Top, Right, Bottom, Left">
            <Stack direction="horizontal" spacing="space-sm" wrap={false}>
              <TextInput type="number" value={0} />
              <TextInput type="number" value={0} />
              <TextInput type="number" value={0} />
              <TextInput type="number" value={0} />
            </Stack>
          </FormControl>
        </Stack>
        <Button variant="primary" onClick={save}>
          {getSaveText()}
        </Button>
        <Button variant="link" onClick={handleRemove}>
          Remove Runner
        </Button>
      </Stack>
    </Card>
  );
}
