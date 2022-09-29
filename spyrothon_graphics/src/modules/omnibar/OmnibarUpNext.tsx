import * as React from "react";
import classNames from "classnames";
import { RunParticipant } from "@spyrothon/api";

import { useSafeSelector } from "@graphics/Store";

import InterviewStore from "../interviews/InterviewStore";
import RunStore from "../runs/RunStore";
import ScheduleStore from "../schedules/ScheduleStore";

import styles from "./OmnibarUpNext.module.css";

function renderNameList(participants: RunParticipant[]) {
  if (participants.length === 0) return null;

  return participants.map((participant) => participant.displayName).join(", ");
}

type OmnibarRunProps = {
  runId?: string;
};

function OmnibarRun(props: OmnibarRunProps) {
  const { runId } = props;

  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  if (run == null) return null;

  return (
    <div className={styles.entry}>
      <div className={styles.entryName}>
        {run.gameName} &middot; <span className={styles.entryCategory}>{run.categoryName}</span>
      </div>
      <div className={styles.entryParticipants}>by {renderNameList(run.runners)}</div>
    </div>
  );
}

type OmnibarInterviewProps = {
  interviewId?: string;
};

function OmnibarInterview(props: OmnibarInterviewProps) {
  const { interviewId } = props;

  const interview = useSafeSelector((state) => InterviewStore.getInterview(state, { interviewId }));
  if (interview == null) return null;

  return (
    <div className={styles.entry}>
      <div className={styles.entryName}>{interview.topic}</div>
      <div className={styles.entryParticipants}>with {renderNameList(interview.interviewees)}</div>
    </div>
  );
}

type OmnibarUpNextProps = {
  className?: string;
};

export default function OmnibarUpNext(props: OmnibarUpNextProps) {
  const { className } = props;

  const upcomingEntries = useSafeSelector((state) => ScheduleStore.getUpcomingEntries(state));
  const upcomingToShow = upcomingEntries.slice(0, 4);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.sectionTitle}>Up Next</div>
      {upcomingToShow.map((entry) => {
        if (entry.runId != null)
          return <OmnibarRun key={`run-${entry.runId}`} runId={entry.runId} />;
        if (entry.interviewId != null)
          return (
            <OmnibarInterview
              key={`interview-${entry.interviewId}`}
              interviewId={entry.interviewId}
            />
          );
        return null;
      })}
    </div>
  );
}
