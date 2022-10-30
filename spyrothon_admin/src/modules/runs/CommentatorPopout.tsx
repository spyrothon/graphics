import * as React from "react";
import {
  Button,
  Card,
  FormControl,
  FormSwitch,
  Header,
  Stack,
  Text,
  TextInput,
} from "@spyrothon/sparx";
import { useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";
import { useSafeSelector } from "@admin/Store";

import { persistRunner } from "./RunActions";
import * as RunStore from "./RunStore";

import styles from "./RunnerPopout.module.css";

export interface CommentatorPopoutProps {
  runId: string;
  commentatorId: string;
}

export default function CommentatorPopout(props: CommentatorPopoutProps) {
  const dispatch = useSafeDispatch();
  const { runId, commentatorId } = props;

  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  const commentator = run.commentators.find((commentator) => commentator.id === commentatorId)!;

  const [displayName, setDisplayName] = React.useState(commentator.displayName);
  const [showWebcam, setShowWebcam] = React.useState(false);

  const [save, getSaveText] = useSaveable(async () => {
    dispatch(persistRunner(runId, commentatorId, { displayName }));
  });

  return (
    <Card level={1} className={styles.container}>
      <Stack spacing="space-lg">
        <Stack direction="horizontal" justify="space-between" align="center">
          <Stack spacing="space-none">
            <Header tag="h1" variant="header-md/normal">
              {commentator.participant.displayName}
            </Header>
            <Text variant="text-sm/secondary">Commentator</Text>
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
            disabled={!commentator.participant.hasWebcam}
            note={
              commentator.participant.hasWebcam
                ? undefined
                : `${commentator.participant.displayName} doesn't have a webcam input configured`
            }
            onChange={(event) => setShowWebcam(event.target.checked)}
          />
        </Stack>
        <Button variant="primary" onClick={save}>
          {getSaveText()}
        </Button>
      </Stack>
    </Card>
  );
}
