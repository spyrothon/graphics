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

import EditParticipantModal from "../participants/EditParticipantModal";
import { useParticipant } from "../participants/ParticipantStore";
import CropDataInput from "./CropDataInput";
import { persistRunner, removeRunner } from "./RunActions";
import * as RunStore from "./RunStore";

import styles from "./RunnerPopout.module.css";

export interface RunnerPopoutProps {
  runId: string;
  runnerId: string;
  onClose: () => void;
}

export default function RunnerPopout(props: RunnerPopoutProps) {
  const dispatch = useSafeDispatch();
  const { runId, runnerId, onClose } = props;

  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  const runner = run.runners.find((runner) => runner.id === runnerId)!;
  const participant = useParticipant(runner.participantId);

  const [displayName, setDisplayName] = React.useState(runner.displayName);
  const [showWebcam, setShowWebcam] = React.useState(false);
  const [gameplayIngestUrl, setGameplayIngestUrl] = React.useState(runner.gameplayIngestUrl);
  const [gameplayCropTransform, setGameplayCropTransform] = React.useState(
    runner.gameplayCropTransform ?? { top: 0, right: 0, bottom: 0, left: 0 },
  );
  const [webcamIngestUrl, setWebcamIngestUrl] = React.useState(runner.webcamIngestUrl);
  const [webcamCropTransform, setWebcamCropTransform] = React.useState(
    runner.webcamCropTransform ?? { top: 0, right: 0, bottom: 0, left: 0 },
  );

  const [save, getSaveText] = useSaveable(async () => {
    dispatch(
      persistRunner(runId, runnerId, {
        displayName,
        gameplayIngestUrl,
        gameplayCropTransform,
        webcamIngestUrl,
        webcamCropTransform,
      }),
    );
  });

  function handleRemove() {
    function remove() {
      dispatch(removeRunner(runId, runnerId));
    }

    const name = runner.displayName ?? participant.displayName;

    openModal((props) => (
      <ConfirmModal
        {...props}
        title={`Remove ${name}`}
        body={`Removing ${name} will remove all information about them and cannot be undone.`}
        onConfirm={remove}
        onCancel={props.onClose}
      />
    ));
  }

  function handleEditParticipant() {
    openModal(({ onClose, ...props }) => {
      function handleClose() {
        onClose();
      }

      return <EditParticipantModal {...props} onClose={handleClose} participant={participant} />;
    });
    onClose();
  }

  return (
    <Card level={1} className={styles.container}>
      <Stack spacing="space-lg">
        <Stack direction="horizontal" justify="space-between" align="center">
          <Stack spacing="space-none">
            <Header tag="h1" variant="header-md/normal">
              {participant.displayName}
            </Header>
            <Text variant="text-sm/secondary">Runner</Text>
          </Stack>
          <Button variant="primary/outline" onClick={handleEditParticipant}>
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
            disabled={!participant.hasWebcam}
            note={
              participant.hasWebcam
                ? undefined
                : `${participant.displayName} doesn't have a webcam input configured`
            }
            onChange={(event) => setShowWebcam(event.target.checked)}
          />
        </Stack>
        <hr className={styles.separator} />
        <Stack spacing="space-md">
          <FormControl label="Gameplay Ingest URL">
            <TextInput
              value={gameplayIngestUrl}
              onChange={(event) => setGameplayIngestUrl(event.target.value)}
            />
          </FormControl>
          <CropDataInput
            label="Gameplay Crop"
            transform={gameplayCropTransform}
            onChange={setGameplayCropTransform}
          />
        </Stack>
        <Stack spacing="space-md">
          <FormControl label="Webcam Ingest URL">
            <TextInput
              value={webcamIngestUrl}
              onChange={(event) => setWebcamIngestUrl(event.target.value)}
            />
          </FormControl>
          <CropDataInput
            label="Webcam Crop"
            transform={webcamCropTransform}
            onChange={setWebcamCropTransform}
          />
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
