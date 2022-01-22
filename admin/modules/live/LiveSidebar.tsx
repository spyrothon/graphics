import * as React from "react";
import classNames from "classnames";

import useSafeDispatch from "@admin/hooks/useDispatch";
import Button from "@uikit/Button";
import { useSafeSelector } from "../../Store";
import RTMPStreams from "../rtmp/RTMPStreams";
import * as ScheduleStore from "../schedules/ScheduleStore";
import { updateSchedule, transitionToSecheduleEntry } from "../schedules/ScheduleActions";
import LiveEntryDisplay from "./LiveEntryDisplay";

import styles from "./LiveSidebar.mod.css";

type LiveSidebarProps = {
  className?: string;
};

export default function LiveSidebar(props: LiveSidebarProps) {
  const { className } = props;
  const dispatch = useSafeDispatch();

  const { currentEntry, nextEntry, prevEntry, schedule } = useSafeSelector((state) => ({
    currentEntry: ScheduleStore.getCurrentEntryWithDependants(state),
    nextEntry: ScheduleStore.getNextEntryWithDependants(state),
    prevEntry: ScheduleStore.getPreviousEntryWithDependants(state),
    schedule: ScheduleStore.getSchedule(state),
  }));

  if (currentEntry == null) return null;

  function handleToggleDebug() {
    if (schedule == null) return;

    dispatch(updateSchedule({ ...schedule, debug: !schedule.debug }));
  }

  function handleTransitionPrevious() {
    if (schedule == null || prevEntry == null) return;

    dispatch(transitionToSecheduleEntry(schedule.id, prevEntry.id));
  }

  function handleTransitionNext() {
    if (schedule == null || nextEntry == null) return;

    dispatch(transitionToSecheduleEntry(schedule.id, nextEntry.id));
  }

  return (
    <div className={classNames(styles.container, className)}>
      <LiveEntryDisplay scheduleEntry={currentEntry} label="On Now" />
      <div className={styles.entrySelection}>
        <Button onClick={handleTransitionPrevious} disabled={prevEntry == null}>
          Go to Previous
        </Button>
        <Button onClick={handleTransitionNext} disabled={nextEntry == null}>
          Go to Next
        </Button>
      </div>
      {nextEntry != null ? <LiveEntryDisplay scheduleEntry={nextEntry} label="Up Next" /> : null}
      {schedule?.id != null ? (
        <RTMPStreams className={styles.rtmp} scheduleId={schedule.id} />
      ) : null}
      <div className={styles.bottom}>
        <Button color={Button.Colors.DEFAULT} fullwidth onClick={handleToggleDebug}>
          {!schedule?.debug ? "Enable Debug Mode" : "Disable Debug Mode"}
        </Button>
      </div>
    </div>
  );
}
