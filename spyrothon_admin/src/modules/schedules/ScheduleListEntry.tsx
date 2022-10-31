import * as React from "react";
import classNames from "classnames";
import { useDrag, useDrop } from "react-dnd";
import { Commentator, InterviewParticipant, Runner, ScheduleEntry } from "@spyrothon/api";
import { Stack, Text } from "@spyrothon/sparx";
import { formatDuration } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { useSafeSelector } from "../../Store";
import * as InterviewStore from "../interviews/InterviewStore";
import getDisplayNameForParticipant from "../participants/getDisplayNameForParticipant";
import * as RunStore from "../runs/RunStore";
import { removeScheduleEntry, selectScheduleEntry } from "./ScheduleActions";

import styles from "./ScheduleList.module.css";

function renderNameList(participants: Array<Runner | Commentator | InterviewParticipant>) {
  if (participants.length === 0) return null;

  return participants.map((participant) => getDisplayNameForParticipant(participant)).join(", ");
}

type RunEntryProps = {
  runId: string;
};

function RunEntry(props: RunEntryProps) {
  const { runId } = props;
  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  if (run == null) return null;

  return (
    <Stack spacing="space-xs" className={styles.runContent}>
      <Text variant="header-sm/normal" lineClamp={1}>
        {run.gameName}
      </Text>
      <Text variant="text-xs/secondary" lineClamp={1}>
        {formatDuration(run.estimateSeconds)} &middot; {run.categoryName}
      </Text>
      <Text variant="text-xs/normal" lineClamp={1}>
        {renderNameList(run.runners)}
      </Text>
    </Stack>
  );
}

type InterviewEntryProps = {
  interviewId: string;
};

function InterviewEntry(props: InterviewEntryProps) {
  const { interviewId } = props;
  const interview = useSafeSelector((state) => InterviewStore.getInterview(state, { interviewId }));
  if (interview == null) return null;

  return (
    <Stack spacing="space-xs" className={styles.runContent}>
      <Text variant="header-sm/normal" lineClamp={1}>
        {interview.topic}
      </Text>
      <Text variant="text-xs/secondary" className={styles.category} lineClamp={1}>
        {formatDuration(interview.estimateSeconds)}
      </Text>
      <Text variant="text-xs/normal" lineClamp={1}>
        {renderNameList(interview.interviewees)}
      </Text>
    </Stack>
  );
}

type ScheduleListEntryProps = {
  scheduleEntry: ScheduleEntry;
  selected: boolean;
  interactive?: boolean;
  onReorder: (entryId: string, newIndex: number) => unknown;
};

type DragItem = {
  type: "schedule-entry";
  entry: ScheduleEntry;
  height?: number;
};

export default function ScheduleListEntry(props: ScheduleListEntryProps) {
  const { scheduleEntry, selected, interactive = true, onReorder } = props;
  const { id: entryId, runId, interviewId, position, setupSeconds } = scheduleEntry;
  const dispatch = useSafeDispatch();

  const entryRef = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "schedule-entry",
    item: { entry: scheduleEntry, height: 60 },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ isDropOver, draggedHeight }, drop] = useDrop({
    accept: "schedule-entry",
    canDrop: (item) => item.entry !== scheduleEntry,
    drop: (item: DragItem) =>
      item.entry.position === position ? null : onReorder(item.entry.id, position),
    collect: (monitor) => ({
      isDropOver: monitor.isOver() && monitor.canDrop(),
      draggedHeight: monitor.getItem()?.entry.id === entryId ? 0 : monitor.getItem()?.height,
    }),
  });
  if (interactive) drag(drop(entryRef));

  function handleSelect() {
    dispatch(selectScheduleEntry(scheduleEntry.id));
  }

  async function handleDelete(event: React.SyntheticEvent<HTMLElement>) {
    if (!window.confirm(`Are you sure you want to delete this entry? #${position}`)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.stopPropagation();
    await dispatch(removeScheduleEntry(scheduleEntry.scheduleId, scheduleEntry.id));
  }

  const setup =
    setupSeconds != null && setupSeconds > 0 ? (
      <Text className={styles.setup} variant="text-xs/secondary">
        Setup: {formatDuration(setupSeconds)}
      </Text>
    ) : null;

  const content = (() => {
    if (runId != null) return <RunEntry runId={runId} />;
    if (interviewId != null) return <InterviewEntry interviewId={interviewId} />;
    return null;
  })();

  return (
    <div
      ref={entryRef}
      className={classNames(styles.entry, {
        [styles.selected]: selected,
        [styles.interactive]: interactive,
        [styles.dragging]: isDragging,
      })}
      onClick={handleSelect}>
      {isDropOver ? (
        <div className={styles.dropTarget} style={{ height: draggedHeight }}></div>
      ) : null}
      {setup}
      <Stack
        className={styles.content}
        direction="horizontal"
        align="start"
        justify="stretch"
        wrap={false}>
        <Text className={styles.scheduleNumber} variant="text-md/secondary">
          {position + 1}
        </Text>
        {content}
        {interactive ? (
          <div className={styles.removeAction} onClick={handleDelete}>
            &times;
          </div>
        ) : null}
      </Stack>
    </div>
  );
}
