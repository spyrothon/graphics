import * as React from "react";
import { Button, Spacer, Stack, Text } from "@spyrothon/sparx";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { useSafeSelector } from "../../Store";
import { transitionToSecheduleEntry, updateSchedule } from "../schedules/ScheduleActions";
import * as ScheduleStore from "../schedules/ScheduleStore";
import LiveEntryDisplay from "./LiveEntryDisplay";
import LiveOBSStatus from "./LiveOBSStatus";

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

  if (currentEntry == null)
    return (
      <div className={className}>
        <Text>This schedule doesn't have any entries</Text>
      </div>
    );

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
    <Stack className={className} align="stretch">
      <LiveEntryDisplay scheduleEntry={currentEntry} label="On Now" />
      <Stack direction="horizontal" justify="stretch">
        <Button variant="primary" onClick={handleTransitionPrevious} disabled={prevEntry == null}>
          Go to Previous
        </Button>
        <Button variant="primary" onClick={handleTransitionNext} disabled={nextEntry == null}>
          Go to Next
        </Button>
      </Stack>
      {nextEntry != null ? <LiveEntryDisplay scheduleEntry={nextEntry} label="Up Next" /> : null}
      <LiveOBSStatus />
      <Spacer expand />
      <Button onClick={handleToggleDebug}>
        {!schedule?.debug ? "Enable Debug Mode" : "Disable Debug Mode"}
      </Button>
    </Stack>
  );
}
