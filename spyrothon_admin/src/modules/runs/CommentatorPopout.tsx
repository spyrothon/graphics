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
import { persistCommentator, removeCommentator } from "./RunActions";
import * as RunStore from "./RunStore";

import styles from "./RunnerPopout.module.css";

export interface CommentatorPopoutProps {
  runId: string;
  commentatorId: string;
  onClose: () => void;
}

export default function CommentatorPopout(props: CommentatorPopoutProps) {
  const dispatch = useSafeDispatch();
  const { runId, commentatorId, onClose } = props;

  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  const commentator = run.commentators.find((commentator) => commentator.id === commentatorId)!;
  const participant = useParticipant(commentator.participantId);

  const [displayName, setDisplayName] = React.useState(commentator.displayName);
  const [showWebcam, setShowWebcam] = React.useState(false);

  const [save, getSaveText] = useSaveable(async () => {
    dispatch(persistCommentator(runId, commentatorId, { displayName }));
  });

  function handleRemove() {
    function remove() {
      dispatch(removeCommentator(runId, commentatorId));
    }

    const name = commentator.displayName ?? participant.displayName;

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
            <Text variant="text-sm/secondary">Commentator</Text>
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
        <Button variant="primary" onClick={save}>
          {getSaveText()}
        </Button>
        <Button variant="link" onClick={handleRemove}>
          Remove Commentator
        </Button>
      </Stack>
    </Card>
  );
}
