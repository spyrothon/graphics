import * as React from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  Header,
  Spacer,
  Stack,
  TextInput,
} from "@spyrothon/sparx";
import { SaveState, useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { createParticipant } from "./ParticipantActions";

import styles from "./CreateParticipantModal.module.css";

interface CreateParticipantModalProps {
  onClose: () => void;
}

export default function CreateParticipantModal(props: CreateParticipantModalProps) {
  const dispatch = useSafeDispatch();
  const { onClose } = props;

  const [displayName, setDisplayName] = React.useState("");
  const [twitchName, setTwitchName] = React.useState("");
  const [twitterName, setTwitterName] = React.useState("");
  const [pronouns, setPronouns] = React.useState("");
  const [pronounsVisible, setPronounsVisible] = React.useState(true);
  const [hasWebcam, setHasWebcam] = React.useState(false);

  const [save, getSaveText, saveState] = useSaveable(async () => {
    dispatch(
      createParticipant({
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
        <Header tag="h1">Create a new Participant</Header>
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
          <Checkbox
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
          {saveState === SaveState.PENDING ? "Create Participant" : getSaveText()}
        </Button>
      </Stack>
    </Card>
  );
}
