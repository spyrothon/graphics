import * as React from "react";
import classNames from "classnames";
import { Interview,Run } from "@spyrothon/api";
import { formatDuration,Header, Text } from "@spyrothon/uikit";

import { ScheduleEntryWithDependants } from "../schedules/ScheduleTypes";

import styles from "./LiveEntryDisplay.module.css";

function Notes({ content }: { content?: string }) {
  if (content == null) return null;

  return (
    <div className={styles.notes}>
      <Header color={Header.Colors.MUTED} size={Header.Sizes.H6} marginless>
        NOTES
      </Header>
      <Text marginless>{content}</Text>
    </div>
  );
}

function EntryRunContent({ run }: { run: Run }) {
  return (
    <div className={styles.content}>
      <Text className={styles.title} marginless>
        {run.gameName} - {run.categoryName}
      </Text>
      <Text color={Text.Colors.MUTED} marginless>
        Estimate: {formatDuration(run.estimateSeconds)}
      </Text>
      <Text marginless>{run.runners.map((runner) => runner.displayName).join(", ")}</Text>
      <Notes content={run.notes} />
    </div>
  );
}

function EntryInterviewContent({ interview }: { interview: Interview }) {
  return (
    <div className={styles.content}>
      <Text>{interview.topic}</Text>
      <Notes content={interview.notes} />
    </div>
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
    <div className={classNames(styles.container, className)}>
      {label != null ? <Header size={Header.Sizes.H4}>{label}</Header> : null}
      {renderEntryContent()}
    </div>
  );
}
