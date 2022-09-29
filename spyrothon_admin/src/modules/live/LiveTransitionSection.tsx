import * as React from "react";
import classNames from "classnames";
import { Check, Circle, Loader } from "react-feather";
import { Transition, TransitionSet, TransitionState } from "@spyrothon/api";
import { Button, Text } from "@spyrothon/uikit";

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
      <div className={styles.transition} key={transition.id}>
        {Icon != null ? (
          <Icon className={styles.transitionIcon} size={16} strokeWidth="3" />
        ) : (
          <div className={styles.transitionIcon} />
        )}
        <Text marginless>
          {transition.obsTransitionInName} to <strong>{transition.obsSceneName}</strong>
          {transition.obsMediaSourceName != null ? (
            <>
              {" - Play "}
              <strong>{transition.obsMediaSourceName}</strong>
            </>
          ) : null}
        </Text>
      </div>
    );
  }

  if (transitionSet == null) {
    return (
      <div className={classNames(styles.container, className)}>
        <Text className={styles.empty} color={Text.Colors.MUTED}>
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
    <div className={classNames(styles.container, className, { [styles.completed]: completed })}>
      <div className={styles.readout}>
        <Text>{inProgress ? "Sequence (in progress):" : "Sequence:"}</Text>
        {transitions.map((transition) => renderTransitionText(transition))}
      </div>
      <div className={styles.info}>
        <Button
          className={styles.transitionButton}
          disabled={!obsConnected || inProgress || completed}
          onClick={() => OBS.executeTransitionSet(transitionSet)}>
          {label}
        </Button>
        {inProgress || completed ? (
          <Button
            className={styles.resetButton}
            onClick={() => dispatch(resetTransitionSet(transitionSet))}
            size={Button.Sizes.SMALL}>
            Reset
          </Button>
        ) : null}
      </div>
    </div>
  );
}
