import * as React from "react";
import classNames from "classnames";

import { RunParticipant } from "@api/APITypes";

import styles from "./NameplateGroup.mod.css";
import Nameplate from "./Nameplate";

type NameplateGroupProps = {
  participants: RunParticipant[];
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
          <Nameplate key={index} className={styles.nameplate} participant={participant} />
        ))}
      </div>
    </div>
  );
}
