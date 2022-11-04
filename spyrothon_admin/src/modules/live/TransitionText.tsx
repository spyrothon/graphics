import * as React from "react";
import classNames from "classnames";
import { Check, Circle, Loader } from "react-feather";
import { Transition, TransitionState } from "@spyrothon/api";
import { Text } from "@spyrothon/sparx";

import styles from "./TransitionText.module.css";

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

interface TransitionTextProps {
  transition: Transition;
  className?: string;
}

export default function TransitionText(props: TransitionTextProps) {
  const { transition, className } = props;
  const Icon = getIconForTransitionState(transition.state);

  return (
    <Text className={classNames(styles.transition, className)}>
      {Icon != null ? (
        <Icon className={styles.transitionIcon} size={16} strokeWidth="3" />
      ) : (
        <div className={styles.transitionIcon} />
      )}
      <span>
        {transition.obsTransitionInName}{" "}
        {transition.transitionDuration != null ? `(${transition.transitionDuration}ms)` : null} to{" "}
        <strong>{transition.obsSceneName}</strong>
        {transition.obsMediaSourceName != null ? (
          <>
            {" - Play "}
            <strong>{transition.obsMediaSourceName}</strong>
          </>
        ) : null}
      </span>
    </Text>
  );
}
