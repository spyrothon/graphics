import * as React from "react";
import classNames from "classnames";
import { Check, Circle, Loader } from "react-feather";
import { Transition, TransitionSet, TransitionState } from "@spyrothon/api";
import { Button, Card, Stack, Text } from "@spyrothon/sparx";

import useSafeDispatch from "@admin/hooks/useDispatch";

import OBS from "../obs/OBS";
import { useOBSConnected } from "../obs/OBSStore";
import { resetTransitionSet } from "../schedules/ScheduleActions";

import styles from "./LiveTransitionSection.module.css";

function getIconForTransitionState(state?: TransitionState) {
  switch (state) {
    case TransitionState.DONE:
      return Check;
    case TransitionState.IN_PROGRESS:
      return Loader;
    default:
      return Circle;
  }
}

interface LiveTransitionSectionProps {
  transitionSet?: TransitionSet;
  label: string;
  className?: string;
  onFinish: () => void;
}

export default function LiveTransitionSection(props: LiveTransitionSectionProps) {
  const dispatch = useSafeDispatch();
  const { transitionSet, label, className } = props;
  const [obsConnected] = useOBSConnected();

  function renderTransitionText(transition: Transition) {
    const Icon = getIconForTransitionState(transition.state);
    return (
      <Text className={styles.transition}>
        {Icon != null ? (
          <Icon className={styles.transitionIcon} size={16} strokeWidth="3" />
        ) : (
          <div className={styles.transitionIcon} />
        )}
        {transition.obsTransitionInName} to <strong>{transition.obsSceneName}</strong>
        {transition.obsMediaSourceName != null ? (
          <>
            {" - Play "}
            <strong>{transition.obsMediaSourceName}</strong>
          </>
        ) : null}
      </Text>
    );
  }

  if (transitionSet == null) {
    return (
      <div className={classNames(styles.container, className)}>
        <Text className={styles.empty} variant="text-md/secondary">
          No Transitions Specified
        </Text>
      </div>
    );
  }

  const { transitions } = transitionSet;
  const completed = transitions.every((transition) => transition.state === TransitionState.DONE);
  const inProgress = transitions.some(
    (transition) => transition.state === TransitionState.IN_PROGRESS,
  );

  return (
    <Card className={className}>
      <Stack direction="horizontal" align="start" justify="space-between">
        <div className={styles.readout}>
          <Text>{inProgress ? "Sequence (in progress):" : "Sequence:"}</Text>
          {transitions.map((transition) => renderTransitionText(transition))}
        </div>
        <Stack className={styles.info}>
          <Button
            className={styles.transitionButton}
            variant="primary"
            disabled={!obsConnected || inProgress || completed}
            onClick={() => OBS.executeTransitionSet(transitionSet)}>
            {label}
          </Button>
          {inProgress || completed ? (
            <Button
              className={styles.resetButton}
              variant="default/outline"
              onClick={() => dispatch(resetTransitionSet(transitionSet))}>
              Reset
            </Button>
          ) : null}
        </Stack>
      </Stack>
    </Card>
  );
}
