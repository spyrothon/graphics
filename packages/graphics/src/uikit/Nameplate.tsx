import * as React from "react";
import classNames from "classnames";

import { RunParticipant } from "@spyrothon/api";
import DurationUtils from "../modules/time/DurationUtils";

import styles from "./Nameplate.module.css";

type NameplateProps = {
  participant: RunParticipant;
  className?: string;
};

export default function Nameplate(props: NameplateProps) {
  const { participant, className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.name}>
        {participant.displayName}
        {participant.pronouns != null ? (
          <span className={styles.pronouns}> {participant.pronouns} </span>
        ) : null}
        {participant.actualSeconds ? (
          <span className={styles.time}>
            {" "}
            &middot; {DurationUtils.toString(participant.actualSeconds)}
          </span>
        ) : null}
      </div>
    </div>
  );
}
