import * as React from "react";
import classNames from "classnames";
import { Commentator, InterviewParticipant, Runner } from "@spyrothon/api";

import getDisplayNameForParticipant from "@graphics/modules/participants/getDisplayNameForParticipant";
import { useParticipant } from "@graphics/modules/participants/ParticipantStore";

import DurationUtils from "../modules/time/DurationUtils";

import styles from "./Nameplate.module.css";

type NameplateProps = {
  entity: Runner | Commentator | InterviewParticipant;
  className?: string;
};

export default function Nameplate(props: NameplateProps) {
  const { entity, className } = props;
  const participant = useParticipant(entity.participantId);
  const name = getDisplayNameForParticipant(entity);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.name}>
        {name}
        {participant.pronouns != null ? (
          <span className={styles.pronouns}> {participant.pronouns} </span>
        ) : null}
        {"actualSeconds" in entity && entity.actualSeconds != null ? (
          <span className={styles.time}>
            {" "}
            &middot; {DurationUtils.toString(entity.actualSeconds)}
          </span>
        ) : null}
      </div>
    </div>
  );
}
