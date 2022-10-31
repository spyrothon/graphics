import * as React from "react";
import { DateTime } from "luxon";
import { Commentator, InterviewParticipant, Runner } from "@spyrothon/api";
import { Anchor, Header, Stack, Text } from "@spyrothon/sparx";
import { formatDuration } from "@spyrothon/utils";

import { useSafeSelector } from "../../Store";
import { getInterview } from "../interviews/InterviewStore";
import getDisplayNameForParticipant from "../participants/getDisplayNameForParticipant";
import { useParticipant } from "../participants/ParticipantStore";
import { getRun } from "../runs/RunStore";
import { getEntriesWithStartTimes, getSchedule } from "../schedules/ScheduleStore";
import { ScheduleEntryWithTimes } from "../schedules/ScheduleTypes";

import styles from "./Schedule.module.css";

import backgroundPoster from "../../res/schedule_background.png";
import backgroundVideo from "../../res/schedule_background.webm";

function ParticipantName(props: { entity: Runner | Commentator | InterviewParticipant }) {
  const { entity } = props;
  const participant = useParticipant(entity.participantId);

  return participant.twitchName != null ? (
    <Anchor className={styles.anchor} href={`https://twitch.tv/${participant.twitchName}`}>
      {getDisplayNameForParticipant(entity)}
    </Anchor>
  ) : (
    <>{getDisplayNameForParticipant(entity)}</>
  );
}

function renderNameList(participants: Runner[]) {
  return participants.map((runner, index) => (
    <React.Fragment key={index}>
      <ParticipantName entity={runner} />
      {index < participants.length - 1 ? ", " : null}
    </React.Fragment>
  ));
}

type RunEntryProps = {
  runId: string;
  startTime: DateTime;
};

function Run(props: RunEntryProps) {
  const { runId, startTime } = props;
  const run = useSafeSelector((state) => getRun(state, { runId }));
  if (run == null) return null;

  return (
    <div className={styles.runContainer}>
      <Text variant="text-md/normal" className={styles.startTime}>
        {startTime.toLocaleString(DateTime.TIME_SIMPLE)}
      </Text>
      <div className={styles.details}>
        <Text className={styles.game}>
          {run.gameNameFormatted}{" "}
          <span className={styles.category}>&middot; {run.categoryName}</span>
        </Text>
        <Text className={styles.participants}>
          {formatDuration(run.estimateSeconds)} &middot; {renderNameList(run.runners)}
        </Text>
      </div>
    </div>
  );
}

type InterviewEntryProps = {
  interviewId: string;
  startTime: DateTime;
};

function Interview(props: InterviewEntryProps) {
  const { interviewId, startTime } = props;
  const interview = useSafeSelector((state) => getInterview(state, { interviewId }));
  if (interview == null) return null;

  return (
    <div className={styles.interviewContainer}>
      <Text variant="text-md/normal" className={styles.startTime}>
        {startTime.toLocaleString(DateTime.TIME_SIMPLE)}
      </Text>
      <div className={styles.details}>
        <Text className={styles.game}>{interview.topic}</Text>
        <Text className={styles.participants}>{renderNameList(interview.interviewees)}</Text>
      </div>
    </div>
  );
}

type DayMarkerProps = {
  time: DateTime;
};

function DayMarker(props: DayMarkerProps) {
  const { time } = props;

  return (
    <Header tag="h2" variant="header-md/normal" className={styles.dayMarker}>
      {time.toLocaleString(DateTime.DATE_MED)}
    </Header>
  );
}

export default function Schedule() {
  const [scheduleEntries, schedule] = useSafeSelector((state) => [
    getEntriesWithStartTimes(state),
    getSchedule(state),
  ]);

  const startTime = React.useMemo(
    () => (schedule != null ? DateTime.fromJSDate(schedule.startTime) : undefined),
    [schedule],
  );

  function renderEntry(entry: ScheduleEntryWithTimes) {
    if (entry.runId != null)
      return <Run runId={entry.runId} startTime={entry.estimatedStartTime} />;
    if (entry.interviewId != null)
      return <Interview interviewId={entry.interviewId} startTime={entry.estimatedStartTime} />;
    return null;
  }

  function renderEntries() {
    let lastStartTime = startTime!;
    let dayEntries: JSX.Element[] = [];
    const groups: JSX.Element[] = [];

    scheduleEntries.forEach((entry, index) => {
      const start = entry.actualStartTime;
      const isNewDay = lastStartTime.day !== start.day || index === 0;
      lastStartTime = start;

      if (isNewDay) {
        if (dayEntries.length > 0) {
          groups.push(
            <div key={`group-${index}`} className={styles.dayGroup}>
              {dayEntries}
            </div>,
          );
        }
        dayEntries = [<DayMarker key="day-first" time={start} />];
      }

      dayEntries.push(
        <div key={entry.id} className={styles.entry}>
          {renderEntry(entry)}
        </div>,
      );
    });

    groups.push(
      <div key="group-last" className={styles.dayGroup}>
        {dayEntries}
      </div>,
    );
    return groups;
  }

  if (schedule == null) return null;

  return (
    <div>
      <video className={styles.background} autoPlay muted loop poster={backgroundPoster}>
        <source src={backgroundVideo} type='video/webm;codecs="vp8, vorbis"' />
      </video>
      <div className={styles.schedule}>
        <Stack align="center" className={styles.eventInfo}>
          <img className={styles.logo} src={schedule.logoUrl} />
          <Text variant="header-md/normal">{startTime?.toLocaleString(DateTime.DATE_FULL)}</Text>
          <Text className={styles.timezone}>
            All times are shown in <strong>{startTime?.offsetNameShort}</strong>.
          </Text>
        </Stack>
        {renderEntries()}
      </div>
    </div>
  );
}
