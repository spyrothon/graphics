import * as React from "react";
import classNames from "classnames";
import { DateTime } from "luxon";
import { RunParticipant } from "@spyrothon/api";

import InterviewStore from "@graphics/modules/interviews/InterviewStore";
import RunStore from "@graphics/modules/runs/RunStore";
import ScheduleStore from "@graphics/modules/schedules/ScheduleStore";
import DurationUtils from "@graphics/modules/time/DurationUtils";
import { useSafeSelector } from "@graphics/Store";

import styles from "./BreakUpNext.module.css";

function renderNameList(participants: RunParticipant[]) {
  if (participants.length === 0) return null;

  return participants.map((participant) => participant.displayName).join(", ");
}

type BreakRunProps = {
  runId: string;
  startTime: DateTime;
};

function BreakRun(props: BreakRunProps) {
  const { runId, startTime } = props;
  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  if (run == null) return null;

  <div className={styles.startTime}>{startTime.toLocaleString(DateTime.TIME_SIMPLE)}</div>;

  return (
    <div className={styles.runContainer}>
      <div className={styles.runLeft}>
        <div className={styles.runGame}>{run.gameName}</div>
        <div className={styles.runParticipants}>{renderNameList(run.runners)}</div>
      </div>
      <div className={styles.runRight}>
        <div className={styles.runCategory}>{run.categoryName}</div>
        <div className={styles.runEstimate}>{DurationUtils.toString(run.estimateSeconds)}</div>
      </div>
    </div>
  );
}

type BreakInterviewProps = {
  interviewId: string;
  startTime: DateTime;
};

function BreakInterview(props: BreakInterviewProps) {
  const { interviewId } = props;
  const interview = useSafeSelector((state) => InterviewStore.getInterview(state, { interviewId }));
  if (interview == null) return null;

  return <div className={styles.interviewContainer}>{interview.topic}</div>;
}

type BreakUpNextProps = {
  reverse?: boolean;
  className?: string;
};

export default function BreakUpNext(props: BreakUpNextProps) {
  const { reverse, className } = props;

  const upcomingEntries = useSafeSelector((state) => ScheduleStore.getUpcomingEntries(state));
  const upcomingToShow = upcomingEntries.slice(0, 4);

  return (
    <div className={classNames(styles.container, className, { [styles.reverse]: reverse })}>
      <div className={styles.sectionTitle}>Coming Up</div>
      {upcomingToShow.map((entry) => {
        if (entry.runId != null)
          return (
            <BreakRun
              key={`run-${entry.runId}`}
              runId={entry.runId}
              startTime={entry.estimatedStartTime}
            />
          );
        if (entry.interviewId != null)
          return (
            <BreakInterview
              key={`interview-${entry.interviewId}`}
              interviewId={entry.interviewId}
              startTime={entry.estimatedStartTime}
            />
          );
        return null;
      })}
    </div>
  );
}
