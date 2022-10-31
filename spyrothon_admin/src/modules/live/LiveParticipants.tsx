import * as React from "react";
import type { Run } from "@spyrothon/api";
import { Button, Card, Checkbox, FormSwitch, Header, Stack, Text } from "@spyrothon/sparx";
import { SaveState, useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";

import getDisplayNameForParticipant from "../participants/getDisplayNameForParticipant";
import { persistRun } from "../runs/RunActions";

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
      runnerWebcams[runner.id] = runner.webcamVisible;
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
      commentatorWebcams[commentator.id] = commentator.webcamVisible;
    }
    return commentatorWebcams;
  });

  function setRunnerVisible(runnerId: string, visible: boolean) {
    setRunnerVisibilities((state) => ({ ...state, [runnerId]: visible }));
  }

  function setCommentatorVisible(commentatorId: string, visible: boolean) {
    setCommentatorVisibilities((state) => ({ ...state, [commentatorId]: visible }));
  }

  function setRunnerWebcam(runnerId: string, webcamVisible: boolean) {
    setRunnerWebcams((state) => ({ ...state, [runnerId]: webcamVisible }));
  }

  function setCommentatorWebcam(commentatorId: string, webcamVisible: boolean) {
    setCommentatorWebcams((state) => ({ ...state, [commentatorId]: webcamVisible }));
  }

  const [handleSave, getSaveText, saveState] = useSaveable(async () => {
    dispatch(
      persistRun(run.id, {
        runners: run.runners.map((runner) => ({
          ...runner,
          visible: runnerVisibilities[runner.id] ?? runner.visible,
          webcamVisible: runnerWebcams[runner.id] ?? runner.webcamVisible,
        })),
        commentators: run.commentators.map((commentator) => ({
          ...commentator,
          visible: commentatorVisibilities[commentator.id] ?? commentator.visible,
          webcamVisible: commentatorWebcams[commentator.id] ?? commentator.webcamVisible,
        })),
      }),
    );
  });

  return (
    <Card className={className}>
      <Stack spacing="space-lg">
        <Header tag="h4" variant="header-md/normal">
          Visibilities
        </Header>
        <Text>Toggle which participants should be shown on the Layout</Text>
        <Stack spacing="space-xl" direction="horizontal" justify="stretch">
          <Stack align="stretch">
            {run.runners.map((runner) => (
              <div key={runner.id}>
                <FormSwitch
                  checked={runnerVisibilities[runner.id] ?? runner.visible}
                  onChange={(event) => setRunnerVisible(runner.id, event.target.checked)}
                  label={
                    <Text variant="header-sm/normal">{getDisplayNameForParticipant(runner)}</Text>
                  }
                />
                <Checkbox
                  checked={runnerWebcams[runner.id] ?? runner.webcamVisible}
                  label="Show Webcam"
                  onChange={(event) => setRunnerWebcam(runner.id, event.target.checked)}
                />
              </div>
            ))}
          </Stack>

          <Stack align="stretch">
            {run.commentators.map((commentator) => (
              <div key={commentator.id}>
                <FormSwitch
                  checked={commentatorVisibilities[commentator.id] ?? commentator.visible}
                  onChange={(event) => setCommentatorVisible(commentator.id, event.target.checked)}
                  label={
                    <Text variant="header-sm/normal">
                      {getDisplayNameForParticipant(commentator)}
                    </Text>
                  }
                />
                <Checkbox
                  checked={commentatorWebcams[commentator.id] ?? commentator.webcamVisible}
                  label="Show Webcam"
                  onChange={(event) => setCommentatorWebcam(commentator.id, event.target.checked)}
                />
              </div>
            ))}
          </Stack>
        </Stack>
        <Button variant="primary" onClick={handleSave} disabled={saveState === SaveState.SAVING}>
          {saveState === SaveState.PENDING ? "Save Visibilities" : getSaveText()}
        </Button>
      </Stack>
    </Card>
  );
}
