import * as React from "react";
import classNames from "classnames";
import { useDrop } from "react-dnd";
import { Text } from "@spyrothon/sparx";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { useSafeSelector } from "../../Store";
import AddEntryButton from "./AddEntryButton";
import { reorderScheduleEntries, selectScheduleEntry } from "./ScheduleActions";
import ScheduleListEntry from "./ScheduleListEntry";
import * as ScheduleStore from "./ScheduleStore";

import styles from "./ScheduleList.module.css";

interface BottomDropTargetProps {
  index: number;
  onReorder: (entryId: string, newIndex: number) => unknown;
}

function BottomDropTarget(props: BottomDropTargetProps) {
  const { index, onReorder } = props;

  const [{ isDropOver }, drop] = useDrop({
    accept: "schedule-entry",
    // @ts-expect-error item isn't typed
    drop: (item) => onReorder(item.entry.id, index),
    collect: (monitor) => ({
      isDropOver: monitor.isOver() && monitor.canDrop(),
    }),
  });

  return (
    <div className={styles.bottomDropTargetPositioner}>
      <div ref={drop} className={styles.bottomDropTarget}>
        {isDropOver ? <div className={styles.dropTargetBar}></div> : null}
      </div>
    </div>
  );
}

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

    const entryIds = scheduleEntries.map((entry) => entry.id);
    const sourceIndex = entryIds.indexOf(movedEntryId);
    // Moving a run further down the list means it will be taken out of the
    // list first, shifting things up by one, and then inserted. So the index
    // needs to be offset.
    if (sourceIndex < newIndex) newIndex -= 1;

    const updatedEntryIds = entryIds.filter((entryId) => entryId !== movedEntryId);
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
      <BottomDropTarget index={scheduleEntries.length + 1} onReorder={handleReorder} />
      <AddEntryButton />
    </div>
  );
}
