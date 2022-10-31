import * as React from "react";
import classNames from "classnames";
import { Commentator, InterviewParticipant, Runner } from "@spyrothon/api";

import Nameplate from "./Nameplate";

import styles from "./NameplateGroup.module.css";

type NameplateGroupProps = {
  participants: Array<Runner | Commentator | InterviewParticipant>;
  title?: React.ReactNode;
  className?: string;
};

export default function NameplateGroup(props: NameplateGroupProps) {
  const { participants, title, className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      {title != null ? <div className={styles.title}>{title}</div> : null}
      <div className={styles.participants}>
        {participants.map((participant, index) => (
          <Nameplate key={index} className={styles.nameplate} entity={participant} />
        ))}
      </div>
    </div>
  );
}
