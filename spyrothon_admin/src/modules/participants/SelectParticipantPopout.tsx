import * as React from "react";
import {
  Button,
  Card,
  Clickable,
  FormControl,
  openModal,
  Stack,
  Text,
  TextInput,
} from "@spyrothon/sparx";
import { fuzzysearch } from "@spyrothon/utils";

import CreateParticipantModal from "../participants/CreateParticipantModal";
import { fetchParticipants } from "./ParticipantActions";
import useParticipantsStore from "./ParticipantStore";

import styles from "./SelectParticipantPopout.module.css";

interface SelectParticipantPopoutProps {
  existingParticipantIds: string[];
  onClose: () => void;
  onSelect: (participantId: string) => Promise<void>;
}

export default function SelectParticipantPopout(props: SelectParticipantPopoutProps) {
  const { existingParticipantIds, onClose, onSelect } = props;

  const [query, setQuery] = React.useState("");

  const participants = useParticipantsStore((state) => state.participants);

  const filteredParticipants = Object.values(participants)
    .filter((participant) => {
      if (existingParticipantIds.includes(participant.id)) return false;
      if (fuzzysearch(query, participant.displayName)) return true;
      if (participant.twitchName != null && fuzzysearch(query, participant.twitchName)) return true;
      if (participant.twitterName != null && fuzzysearch(query, participant.twitterName))
        return true;
      return false;
    })
    .slice(0, 8);

  React.useEffect(() => {
    fetchParticipants();
  }, []);

  function handleCreateNewParticipant() {
    openModal((props) => <CreateParticipantModal {...props} />);
  }

  function handleSelect(participantId: string) {
    onSelect(participantId).then(() => onClose());
  }

  return (
    <Card level={1}>
      <Stack spacing="space-lg">
        <FormControl
          label="Add a Participant"
          note="Search by display name, twitch, or twitter username">
          <TextInput value={query} onChange={(event) => setQuery(event.target.value)} autoFocus />
        </FormControl>

        {filteredParticipants.map((participant) => (
          <Clickable
            key={participant.id}
            className={styles.participant}
            onClick={() => handleSelect(participant.id)}>
            <Stack spacing="space-none">
              <Text variant="header-sm/normal">{participant.displayName}</Text>
              <Text variant="text-sm/normal">{participant.twitchName}</Text>
            </Stack>
          </Clickable>
        ))}

        <Button variant="primary/outline" onClick={handleCreateNewParticipant}>
          Create new Participant
        </Button>
      </Stack>
    </Card>
  );
}
