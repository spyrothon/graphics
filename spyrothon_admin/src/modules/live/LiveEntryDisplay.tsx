import * as React from "react";
import classNames from "classnames";
import { Interview, Run } from "@spyrothon/api";
import { Card, Header, Stack, Text } from "@spyrothon/sparx";
import { formatDuration } from "@spyrothon/uikit";

import { ScheduleEntryWithDependants } from "../schedules/ScheduleTypes";

import styles from "./LiveEntryDisplay.module.css";

function Notes({ content }: { content?: string }) {
  if (content == null) return null;

  return (
    <div className={styles.notes}>
      <Header variant="header-xs/secondary" tag="h6">
        NOTES
      </Header>
      <Text>{content}</Text>
    </div>
  );
}

function EntryRunContent({ run }: { run: Run }) {
  return (
    <Stack spacing="space-xs" className={styles.content}>
      <Text variant="header-sm/normal">
        {run.gameName} - {run.categoryName}
      </Text>
      <Text variant="text-md/secondary">Estimate: {formatDuration(run.estimateSeconds)}</Text>
      <Text>{run.runners.map((runner) => runner.displayName).join(", ")}</Text>
      <Notes content={run.notes} />
    </Stack>
  );
}

function EntryInterviewContent({ interview }: { interview: Interview }) {
  return (
    <Stack className={styles.content}>
      <Text>{interview.topic}</Text>
      <Notes content={interview.notes} />
    </Stack>
  );
}

interface LiveEntryDisplayProps {
  label?: string;
  scheduleEntry: ScheduleEntryWithDependants;
  className?: string;
}

export default function LiveEntryDisplay(props: LiveEntryDisplayProps) {
  const { label, scheduleEntry, className } = props;

  function renderEntryContent() {
    if (scheduleEntry.run != null) {
      return <EntryRunContent run={scheduleEntry.run} />;
    }
    if (scheduleEntry.interview != null) {
      return <EntryInterviewContent interview={scheduleEntry.interview} />;
    }

    return null;
  }

  return (
    <Card className={className}>
      <Stack spacing="space-lg">
        {label != null ? (
          <Header variant="header-md/normal" tag="h4">
            {label}
          </Header>
        ) : null}
        {renderEntryContent()}
      </Stack>
    </Card>
  );
}
