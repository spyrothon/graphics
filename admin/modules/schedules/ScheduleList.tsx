import * as React from "react";
import classNames from "classnames";

import { MAIN_SCHEDULE_ID } from "../../Constants";
import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Text from "../../uikit/Text";
import { selectScheduleEntry, reorderScheduleEntries } from "./ScheduleActions";
import ScheduleListEntry from "./ScheduleListEntry";
import * as ScheduleStore from "./ScheduleStore";

import styles from "./ScheduleList.mod.css";
import AddEntryButton from "./AddEntryButton";

type RunListProps = {
  className?: string;
};

export default function ScheduleList(props: RunListProps) {
  const { className } = props;
  const dispatch = useSafeDispatch();

  const { schedule, isFetching, scheduleEntries, selectedEntryId } = useSafeSelector((state) => ({
    schedule: ScheduleStore.getSchedule(state),
    isFetching: ScheduleStore.isFetchingSchedule(state),
    scheduleEntries: ScheduleStore.getScheduleEntries(state),
    selectedEntryId: ScheduleStore.getSelectedEntryId(state),
  }));

  // Auto-select the first run when the runs are first loaded
  React.useEffect(() => {
    if (isFetching) return;

    const first = scheduleEntries[0];
    if (first == null) return;

    dispatch(selectScheduleEntry(first.id));
    // Only want this to run immediately after the runs have loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  function handleReorder(movedEntryId: string, newIndex: number) {
    if (schedule == null) return;

    const updatedEntryIds = scheduleEntries
      .map((entry) => entry.id)
      .filter((entryId) => entryId !== movedEntryId);

    updatedEntryIds.splice(newIndex, 0, movedEntryId);

    dispatch(reorderScheduleEntries(schedule, updatedEntryIds));
  }

  return (
    <div className={classNames(styles.container, className)}>
      {isFetching ? (
        <Text className={styles.fetching}>Fetching Schedule</Text>
      ) : (
        scheduleEntries.map((entry) => (
          <ScheduleListEntry
            key={entry.id}
            scheduleEntry={entry}
            selected={entry.id === selectedEntryId}
            onReorder={handleReorder}
          />
        ))
      )}
      <AddEntryButton scheduleId={MAIN_SCHEDULE_ID} />
    </div>
  );
}
