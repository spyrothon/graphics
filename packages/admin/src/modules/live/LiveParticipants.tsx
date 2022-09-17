import * as React from "react";
import classNames from "classnames";
import type { Run } from "@spyrothon/api";
import { Button, Checkbox, Header, Text } from "@spyrothon/uikit";

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
      runnerVisibilities[runner.displayName] = runner.visible;
    }
    return runnerVisibilities;
  });

  const [runnerWebcams, setRunnerWebcams] = React.useState(() => {
    const runnerWebcams: { [name: string]: boolean } = {};
    for (const runner of run.runners) {
      runnerWebcams[runner.displayName] = runner.hasWebcam;
    }
    return runnerWebcams;
  });

  const [commentatorVisibilities, setCommentatorVisibilities] = React.useState(() => {
    const commentatorVisibilities: { [name: string]: boolean } = {};
    for (const commentator of run.commentators) {
      commentatorVisibilities[commentator.displayName] = commentator.visible;
    }
    return commentatorVisibilities;
  });

  const [commentatorWebcams, setCommentatorWebcams] = React.useState(() => {
    const commentatorWebcams: { [name: string]: boolean } = {};
    for (const commentator of run.commentators) {
      commentatorWebcams[commentator.displayName] = commentator.hasWebcam;
    }
    return commentatorWebcams;
  });

  function setRunnerVisible(displayName: string, visible: boolean) {
    setRunnerVisibilities((state) => ({ ...state, [displayName]: visible }));
  }

  function setCommentatorVisible(displayName: string, visible: boolean) {
    setCommentatorVisibilities((state) => ({ ...state, [displayName]: visible }));
  }

  function setRunnerWebcam(displayName: string, hasWebcam: boolean) {
    setRunnerWebcams((state) => ({ ...state, [displayName]: hasWebcam }));
  }

  function setCommentatorWebcam(displayName: string, hasWebcam: boolean) {
    setCommentatorWebcams((state) => ({ ...state, [displayName]: hasWebcam }));
  }

  function handleSave() {
    dispatch(
      persistRun(run.id, {
        runners: run.runners.map((runner) => ({
          ...runner,
          visible: runnerVisibilities[runner.displayName] ?? runner.visible,
          hasWebcam: runnerWebcams[runner.displayName] ?? runner.hasWebcam,
        })),
        commentators: run.commentators.map((commentator) => ({
          ...commentator,
          visible: commentatorVisibilities[commentator.displayName] ?? commentator.visible,
          hasWebcam: commentatorWebcams[commentator.displayName] ?? commentator.hasWebcam,
        })),
      }),
    );
  }

  return (
    <div className={classNames(className)}>
      <Header size={Header.Sizes.H4}>Visibilities</Header>
      <Text>Toggle which participants should be shown on the Layout</Text>
      <div className={styles.columns}>
        <div className={styles.checkboxes}>
          {run.runners.map((runner) => (
            <div key={runner.displayName} className={styles.row}>
              <div className={styles.participantVisibility}>
                <Checkbox
                  checked={runnerVisibilities[runner.displayName] ?? runner.visible}
                  onChange={(event) => setRunnerVisible(runner.displayName, event.target.checked)}
                  label={runner.displayName}
                />
              </div>
              <div className={styles.participantWebcam}>
                <Checkbox
                  checked={runnerWebcams[runner.displayName] ?? runner.hasWebcam}
                  label="Has Webcam"
                  onChange={(event) => setRunnerWebcam(runner.displayName, event.target.checked)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.checkboxes}>
          {run.commentators.map((commentator) => (
            <div key={commentator.displayName} className={styles.row}>
              <div className={styles.participantVisibility}>
                <Checkbox
                  checked={commentatorVisibilities[commentator.displayName] ?? commentator.visible}
                  onChange={(event) =>
                    setCommentatorVisible(commentator.displayName, event.target.checked)
                  }
                  label={commentator.displayName}
                />
              </div>
              <div className={styles.participantWebcam}>
                <Checkbox
                  checked={commentatorWebcams[commentator.displayName] ?? commentator.hasWebcam}
                  label="Has Webcam"
                  onChange={(event) =>
                    setCommentatorWebcam(commentator.displayName, event.target.checked)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={handleSave}>Save Visibilities</Button>
    </div>
  );
}
