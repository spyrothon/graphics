import * as React from "react";
import { Participant } from "@spyrothon/api";
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormSwitch,
  Header,
  Spacer,
  Stack,
  TextInput,
} from "@spyrothon/sparx";
import { SaveState, useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { persistParticipant } from "./ParticipantActions";

import styles from "./CreateParticipantModal.module.css";

interface EditParticipantModalProps {
  participant: Participant;
  onClose: () => void;
}

export default function EditParticipantModal(props: EditParticipantModalProps) {
  const dispatch = useSafeDispatch();
  const { participant, onClose } = props;

  const [displayName, setDisplayName] = React.useState(participant.displayName);
  const [twitchName, setTwitchName] = React.useState(participant.twitchName);
  const [twitterName, setTwitterName] = React.useState(participant.twitterName);
  const [pronouns, setPronouns] = React.useState(participant.pronouns);
  const [pronounsVisible, setPronounsVisible] = React.useState(participant.pronounsVisible ?? true);
  const [hasWebcam, setHasWebcam] = React.useState(participant.hasWebcam ?? false);

  const [save, getSaveText, saveState] = useSaveable(async () => {
    dispatch(
      persistParticipant(participant.id, {
        displayName,
        twitchName,
        twitterName,
        pronouns,
        pronounsVisible,
        hasWebcam,
      }),
    );
  });

  async function handleSave() {
    await save();
    onClose();
  }

  return (
    <Card level={1} className={styles.container}>
      <Stack spacing="space-lg">
        <Header tag="h1">Edit {participant.displayName}</Header>
        <Stack spacing="space-lg">
          <Header tag="h2" variant="header-md/normal">
            Display Info
          </Header>
          <FormControl label="Display Name">
            <TextInput
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </FormControl>
          <FormSwitch
            checked={hasWebcam}
            label="Has Webcam Available"
            onChange={(event) => setHasWebcam(event.target.checked)}
          />
          <Stack direction="horizontal" justify="stretch" align="end">
            <FormControl label="Pronouns">
              <TextInput value={pronouns} onChange={(event) => setPronouns(event.target.value)} />
            </FormControl>
            <Checkbox
              checked={pronounsVisible}
              label="Show Pronouns on Stream"
              onChange={(event) => setPronounsVisible(event.target.checked)}
            />
          </Stack>
          <Spacer />
          <Header tag="h2" variant="header-md/normal">
            Socials
          </Header>
          <Stack direction="horizontal" justify="stretch">
            <FormControl label="Twitch">
              <TextInput
                value={twitchName}
                onChange={(event) => setTwitchName(event.target.value)}
              />
            </FormControl>
            <FormControl label="Twitter">
              <TextInput
                value={twitterName}
                onChange={(event) => setTwitterName(event.target.value)}
              />
            </FormControl>
          </Stack>
        </Stack>
        <Spacer />
        <Button variant="primary" onClick={handleSave} disabled={saveState === SaveState.SAVING}>
          {getSaveText()}
        </Button>
      </Stack>
    </Card>
  );
}
