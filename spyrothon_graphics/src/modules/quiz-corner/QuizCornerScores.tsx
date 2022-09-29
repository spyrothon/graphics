import * as React from "react";
import classNames from "classnames";
import { Interview } from "@spyrothon/api";

import styles from "./QuizCornerScores.module.css";

type QuizCornerScoresProps = {
  interview?: Interview;
  className?: string;
};

export default function QuizCornerScores(props: QuizCornerScoresProps) {
  const { interview, className } = props;
  if (interview == null) return null;

  const { interviewees: participants } = interview;

  return (
    <div className={classNames(styles.container, className)}>
      {participants.map((participant) => (
        <div key={participant.displayName} className={styles.participant}>
          <div className={styles.participantScore}>{participant.score ?? 0}</div>
          <div className={styles.participantName}>{participant.displayName}</div>
        </div>
      ))}
    </div>
  );
}
