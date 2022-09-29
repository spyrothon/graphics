import * as React from "react";
import classNames from "classnames";
import { Schedule } from "@spyrothon/api";
import { Anchor, Button, Text } from "@spyrothon/uikit";

import CurrentScheduleContext from "./CurrentScheduleContext";

import styles from "./ScheduleCard.module.css";

function timeString(time: Date) {
  return `${time.toDateString()} at ${time.toLocaleTimeString()}`;
}

interface ScheduleCardProps {
  schedule: Schedule;
  className?: string;
  onSelect: () => void;
}

export default function ScheduleCard(props: ScheduleCardProps) {
  const { schedule, className, onSelect } = props;
  const { scheduleId: currentScheduleId } = React.useContext(CurrentScheduleContext);
  const isCurrent = schedule.id === currentScheduleId;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.info}>
        <Text size={Text.Sizes.SIZE_24} marginless>
          {schedule.name}
        </Text>
        {schedule.twitchUrl != null ? (
          <Text marginless>
            Streaming on <Anchor href={schedule.twitchUrl}>{schedule.twitchUrl}</Anchor>
          </Text>
        ) : null}
        <Text>{schedule.series}</Text>
        <Text>
          <strong>Starts:</strong> {timeString(schedule.startTime)}
          {schedule.endTime != null ? (
            <>
              <br />
              <strong>Ends:</strong> {timeString(schedule.endTime)}
            </>
          ) : null}
        </Text>
      </div>

      <div className={styles.images}>
        {schedule.logoUrl ? (
          <img className={styles.logo} src={schedule.logoUrl} />
        ) : (
          <Text size={Text.Sizes.SIZE_20} color={Text.Colors.MUTED}>
            No Logo
          </Text>
        )}
        <Button onClick={onSelect} disabled={isCurrent}>
          {isCurrent ? "Already Active" : "Use this Schedule"}
        </Button>
      </div>
    </div>
  );
}
