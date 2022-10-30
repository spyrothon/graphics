import * as React from "react";
import type { Run } from "@spyrothon/api";
import { Button, Card, Checkbox, Header, Stack, Text } from "@spyrothon/sparx";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { persistRun } from "../runs/RunActions";

import styles from "./LiveParticipants.module.css";

type LiveParticipantsProps = {
  run: Run;
  className?: string;
};

export default function LiveParticipants(props: LiveParticipantsProps) {
  const { run, className } = props;
  const dispatch = useSafeDispatch();

  const [runnerVisibilities, setRunnerVisibilities] = React.useState(() => {
    const runnerVisibilities: { [name: string]: boolean } = {};
    for (const runner of run.runners) {
      runnerVisibilities[runner.id] = runner.visible;
    }
    return runnerVisibilities;
  });

  const [runnerWebcams, setRunnerWebcams] = React.useState(() => {
    const runnerWebcams: { [name: string]: boolean } = {};
    for (const runner of run.runners) {
      runnerWebcams[runner.id] = runner.hasWebcam;
    }
    return runnerWebcams;
  });

  const [commentatorVisibilities, setCommentatorVisibilities] = React.useState(() => {
    const commentatorVisibilities: { [name: string]: boolean } = {};
    for (const commentator of run.commentators) {
      commentatorVisibilities[commentator.id] = commentator.visible;
    }
    return commentatorVisibilities;
  });

  const [commentatorWebcams, setCommentatorWebcams] = React.useState(() => {
    const commentatorWebcams: { [name: string]: boolean } = {};
    for (const commentator of run.commentators) {
      commentatorWebcams[commentator.id] = commentator.hasWebcam;
    }
    return commentatorWebcams;
  });

  function setRunnerVisible(runnerId: string, visible: boolean) {
    setRunnerVisibilities((state) => ({ ...state, [runnerId]: visible }));
  }

  function setCommentatorVisible(commentatorId: string, visible: boolean) {
    setCommentatorVisibilities((state) => ({ ...state, [commentatorId]: visible }));
  }

  function setRunnerWebcam(runnerId: string, hasWebcam: boolean) {
    setRunnerWebcams((state) => ({ ...state, [runnerId]: hasWebcam }));
  }

  function setCommentatorWebcam(commentatorId: string, hasWebcam: boolean) {
    setCommentatorWebcams((state) => ({ ...state, [commentatorId]: hasWebcam }));
  }

  function handleSave() {
    dispatch(
      persistRun(run.id, {
        runners: run.runners.map((runner) => ({
          ...runner,
          visible: runnerVisibilities[runner.id] ?? runner.visible,
          hasWebcam: runnerWebcams[runner.id] ?? runner.hasWebcam,
        })),
        commentators: run.commentators.map((commentator) => ({
          ...commentator,
          visible: commentatorVisibilities[commentator.id] ?? commentator.visible,
          hasWebcam: commentatorWebcams[commentator.id] ?? commentator.hasWebcam,
        })),
      }),
    );
  }

  return (
    <Card className={className}>
      <Stack spacing="space-lg">
        <Header tag="h4" variant="header-md/normal">
          Visibilities
        </Header>
        <Text>Toggle which participants should be shown on the Layout</Text>
        <Stack direction="horizontal" justify="stretch">
          <Stack align="stretch">
            {run.runners.map((runner) => (
              <div key={runner.id} className={styles.row}>
                <Checkbox
                  checked={runnerVisibilities[runner.id] ?? runner.visible}
                  onChange={(event) => setRunnerVisible(runner.id, event.target.checked)}
                  label={<Text variant="header-sm/normal">{runner.displayName}</Text>}
                />
                <div className={styles.participantWebcam}>
                  <Checkbox
                    checked={runnerWebcams[runner.id] ?? runner.hasWebcam}
                    label="Has Webcam"
                    onChange={(event) => setRunnerWebcam(runner.id, event.target.checked)}
                  />
                </div>
              </div>
            ))}
          </Stack>

          <Stack align="stretch">
            {run.commentators.map((commentator) => (
              <div key={commentator.id} className={styles.row}>
                <Checkbox
                  checked={commentatorVisibilities[commentator.id] ?? commentator.visible}
                  onChange={(event) => setCommentatorVisible(commentator.id, event.target.checked)}
                  label={<Text variant="header-sm/normal">{commentator.displayName}</Text>}
                />
                <div className={styles.participantWebcam}>
                  <Checkbox
                    checked={commentatorWebcams[commentator.id] ?? commentator.hasWebcam}
                    label="Has Webcam"
                    onChange={(event) => setCommentatorWebcam(commentator.id, event.target.checked)}
                  />
                </div>
              </div>
            ))}
          </Stack>
        </Stack>
        <Button variant="primary" onClick={handleSave}>
          Save Visibilities
        </Button>
      </Stack>
    </Card>
  );
}
