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
import getDisplayNameForParticipant from "../participants/getDisplayNameForParticipant";
import { useParticipant } from "../participants/ParticipantStore";
import {
  persistInterviewee,
  persistInterviewer,
  removeInterviewee,
  removeInterviewer,
} from "./InterviewActions";
import * as InterviewStore from "./InterviewStore";

import styles from "./InterviewParticipantPopout.module.css";

export interface InterviewParticipantPopoutProps {
  interviewId: string;
  interviewParticipantId: string;
  type: "interviewers" | "interviewees";
  onClose: () => void;
}

export default function InterviewParticipantPopout(props: InterviewParticipantPopoutProps) {
  const dispatch = useSafeDispatch();
  const { interviewId, interviewParticipantId, type, onClose } = props;

  const interview = useSafeSelector((state) => InterviewStore.getInterview(state, { interviewId }));
  const interviewParticipant = interview[type].find(
    (commentator) => commentator.id === interviewParticipantId,
  )!;
  const participant = useParticipant(interviewParticipant.participantId);

  const [displayName, setDisplayName] = React.useState(interviewParticipant.displayName);
  const [webcamVisible, setWebcamVisible] = React.useState(interviewParticipant.webcamVisible);

  const persistFunction = type === "interviewers" ? persistInterviewer : persistInterviewee;
  const removeFunction = type === "interviewers" ? removeInterviewer : removeInterviewee;

  const [save, getSaveText] = useSaveable(async () => {
    dispatch(persistFunction(interviewId, interviewParticipantId, { displayName, webcamVisible }));
  });

  function handleRemove() {
    function remove() {
      dispatch(removeFunction(interviewId, interviewParticipantId));
    }

    const name = getDisplayNameForParticipant(interviewParticipant);

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
            checked={webcamVisible}
            disabled={!participant.hasWebcam}
            note={
              participant.hasWebcam
                ? undefined
                : `${participant.displayName} doesn't have a webcam input configured`
            }
            onChange={(event) => setWebcamVisible(event.target.checked)}
          />
        </Stack>
        <Button variant="primary" onClick={save}>
          {getSaveText()}
        </Button>
        <Button variant="link" onClick={handleRemove}>
          Remove Participant
        </Button>
      </Stack>
    </Card>
  );
}
