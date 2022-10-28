import * as React from "react";
import classNames from "classnames";
import { Flag, Icon, Pause, Play, Repeat } from "react-feather";
import type { Run, RunParticipant } from "@spyrothon/api";
import { Button, ButtonVariantColor, Card, Header, Stack, Text } from "@spyrothon/sparx";
import { formatDuration, useAnimationFrame } from "@spyrothon/uikit";

import useSafeDispatch, { SafeDispatch } from "@admin/hooks/useDispatch";

import getRunState from "../runs/getRunState";
import {
  finishRun,
  finishRunParticipant,
  pauseRun,
  resetRun,
  resumeRun,
  resumeRunParticipant,
  startRun,
} from "../runs/RunActions";

import styles from "./LiveRunTimers.module.css";

function getElapsedRunSeconds(run: Run, runnerId?: string, asOf: Date = new Date()) {
  const { actualSeconds, startedAt, pausedAt, pauseSeconds = 0, runners } = run;
  const runner = runners.find((runner) => runner.id === runnerId);

  // Individual runner has already finished, no calculation needed.
  if (runnerId != null && runner?.actualSeconds) return runner.actualSeconds;
  // All remaining times are independent of individual runners.
  // Run is fully completed, no calculation needed.
  if (actualSeconds) return actualSeconds;
  // Run is paused, calculate relative to the most recent pause time.
  if (pausedAt != null && startedAt != null)
    return (pausedAt.getTime() - startedAt.getTime()) / 1000 - pauseSeconds;
  // Run is in progress.
  if (startedAt != null) return (asOf.getTime() - startedAt.getTime()) / 1000 - pauseSeconds;

  // Run is not started.
  return 0;
}

interface LiveTimerProps {
  run: Run;
  runnerId?: string;
  asOf?: Date;
}

function LiveTimer(props: LiveTimerProps) {
  const { run, runnerId, asOf } = props;
  const [time, setTime] = React.useState(() => getElapsedRunSeconds(run, runnerId, asOf));

  useAnimationFrame(() => {
    return setTime(getElapsedRunSeconds(run, runnerId, asOf));
  }, [run, runnerId, asOf]);

  return <>{formatDuration(time)}</>;
}

interface TimerAction {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Icon: Icon;
  action: (dispatch: SafeDispatch) => void;
  disabled?: boolean;
  color?: ButtonVariantColor;
  strokeWidth?: string;
  label?: string;
}

function getPlayAction(run: Run): TimerAction | undefined {
  if ((run.runners.length <= 1 && run.finished) || run.pausedAt != null) {
    return {
      Icon: Play,
      action(dispatch) {
        dispatch(resumeRun(run.id));
      },
    };
  }

  if (run.startedAt != null) return undefined;

  return {
    Icon: Play,
    action(dispatch) {
      dispatch(startRun(run.id));
    },
  };
}

function getFinishAction(run: Run): TimerAction | undefined {
  if (run.finished) return undefined;
  if (run.runners.length > 1) return undefined;
  if (run.startedAt == null) return undefined;

  return {
    Icon: Flag,
    action(dispatch) {
      dispatch(finishRun(run.id));
    },
  };
}

function getPauseAction(run: Run): TimerAction | undefined {
  if (run.startedAt == null) return undefined;
  if (run.finished) return undefined;
  if (run.pausedAt != null) return undefined;

  return {
    Icon: Pause,
    color: "default",
    strokeWidth: "2",
    action(dispatch) {
      dispatch(pauseRun(run.id));
    },
  };
}

function getResetAction(run: Run): TimerAction | undefined {
  if (run.startedAt == null) return undefined;
  return {
    Icon: Repeat,
    color: "default",
    action(dispatch) {
      dispatch(resetRun(run.id));
    },
  };
}

function getParticipantAction(run: Run, runner: RunParticipant): TimerAction {
  const allDisabled = run.startedAt == null || run.pausedAt != null;

  if (runner.finishedAt != null) {
    return {
      Icon: Play,
      disabled: allDisabled,
      color: "primary",
      action(dispatch) {
        dispatch(resumeRunParticipant(run.id, runner.id));
      },
    };
  }

  return {
    Icon: Flag,
    disabled: allDisabled,
    color: "primary",
    action(dispatch) {
      dispatch(finishRunParticipant(run.id, runner.id));
    },
  };
}

interface ActionButtonProps {
  action?: TimerAction;
}

function ActionButton(props: ActionButtonProps) {
  const dispatch = useSafeDispatch();
  if (props.action == null) return null;

  const { Icon, action, color = "primary", disabled = false, strokeWidth = "3" } = props.action;

  return (
    <Button onClick={() => action(dispatch)} color={color} disabled={disabled}>
      <Icon size={16} strokeWidth={strokeWidth} />
    </Button>
  );
}

interface LiveTimerProps {
  run: Run;
  className?: string;
}

export default function LiveRunTimers(props: LiveTimerProps) {
  const { run, className } = props;

  const runnersTable =
    run.runners.length <= 1 ? null : (
      <table className={styles.runners}>
        <thead>
          <tr>
            <th>Runner</th>
            <th>Current Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {run.runners.map((runner) => (
            <tr key={runner.displayName} className={styles.runnerTimer}>
              <td>
                <Text>{runner.displayName}</Text>
              </td>
              <td
                className={classNames(styles.timer, {
                  [styles.inProgress]: runner.finishedAt == null,
                })}>
                <LiveTimer run={run} runnerId={runner.id} />
              </td>
              <td width="20">
                <ActionButton action={getParticipantAction(run, runner)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <Card className={className}>
      <Stack spacing="space-lg">
        <Header tag="h4" variant="header-md/normal">
          Run Timer
        </Header>
        <Stack direction="horizontal" spacing="space-md" align="center" justify="stretch">
          <div>
            <Text variant="header-lg/normal" className={styles.timer}>
              <LiveTimer run={run} />
            </Text>
            <Text variant="text-sm/normal">{getRunState(run)}</Text>
          </div>
          <ActionButton action={getFinishAction(run)} />
          <ActionButton action={getPlayAction(run)} />
          <ActionButton action={getPauseAction(run)} />
          <ActionButton action={getResetAction(run)} />
        </Stack>
        {runnersTable}
      </Stack>
    </Card>
  );
}
