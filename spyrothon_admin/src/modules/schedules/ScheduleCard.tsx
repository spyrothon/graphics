import * as React from "react";
import { Schedule } from "@spyrothon/api";
import { Anchor, Button, Card, Stack, Text } from "@spyrothon/sparx";

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
    <Card className={className}>
      <Stack direction="horizontal" justify="space-between">
        <div className={styles.info}>
          <Text variant="header-md/normal">{schedule.name}</Text>
          {schedule.twitchUrl != null ? (
            <Text>
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
            <Text variant="text-lg/secondary">No Logo</Text>
          )}
          <Button variant="primary" onClick={onSelect} disabled={isCurrent}>
            {isCurrent ? "Already Active" : "Use this Schedule"}
          </Button>
        </div>
      </Stack>
    </Card>
  );
}
