import { DateTime } from "luxon";
import { createSelector } from "reselect";

import { StoreState } from "../../Store";
import { getInterviewsById } from "../interviews/InterviewStore";
import { getRunsById } from "../runs/RunStore";
import type { ScheduleEntryWithDependants, ScheduleEntryWithTimes } from "./ScheduleTypes";

const getSchedulesState = (globalState: StoreState) => globalState.schedules;
export const getSchedule = (state: StoreState) => getSchedulesState(state).schedule;

export const isFetchingSchedule = createSelector([getSchedulesState], (state) => state.fetching);

export const getScheduleStartTime = createSelector([getSchedule], (schedule) =>
  schedule != null ? DateTime.fromJSDate(schedule.startTime) : undefined,
);

export const getScheduleEntries = createSelector(
  [getSchedulesState],
  (state) => state.schedule?.scheduleEntries ?? [],
);

export const getScheduleEntriesWithDependants = createSelector(
  [getScheduleEntries, getRunsById, getInterviewsById],
  (entries, runs, interviews) => {
    return entries.map((entry): ScheduleEntryWithDependants => {
      return {
        ...entry,
        run: entry.runId != null ? runs[entry.runId] : undefined,
        interview: entry.interviewId != null ? interviews[entry.interviewId] : undefined,
      };
    });
  },
);

export const getCurrentEntryId = (state: StoreState) => getSchedule(state)?.currentEntryId;

export const getCurrentEntry = createSelector(
  [getScheduleEntries, getCurrentEntryId],
  (entries, entryId) => entries.find((entry) => entry.id === entryId),
);

export const getCurrentEntryWithDependants = createSelector(
  [getScheduleEntriesWithDependants, getCurrentEntryId],
  (entries, entryId) => entries.find((entry) => entry.id === entryId),
);

export const getPreviousEntryWithDependants = createSelector(
  [getScheduleEntriesWithDependants, getCurrentEntryId],
  (entries, entryId) => {
    const index = entries.findIndex((entry) => entry.id === entryId);
    return index < 0 ? undefined : entries[index - 1];
  },
);

export const getNextEntryWithDependants = createSelector(
  [getScheduleEntriesWithDependants, getCurrentEntryId],
  (entries, entryId) => {
    const index = entries.findIndex((entry) => entry.id === entryId);
    return index < 0 ? undefined : entries[index + 1];
  },
);

export const getSelectedEntryId = createSelector(
  [getSchedulesState],
  (state) => state.selectedEntryId,
);
export const getSelectedEntry = createSelector(
  [getScheduleEntries, getSelectedEntryId],
  (entries, selectedId) => entries.find((entry) => entry.id === selectedId),
);

export const getEntriesWithStartTimes = createSelector(
  [getScheduleStartTime, getScheduleEntries, getRunsById, getInterviewsById],
  (scheduleStartTime, entries, runs, interviews) => {
    if (scheduleStartTime == null) return [];
    const scheduleStart = scheduleStartTime;

    let lastActualStartTime = scheduleStart;
    let lastEstimatedStartTime = scheduleStart;

    return entries.map((entry): ScheduleEntryWithTimes => {
      const nextActualStartTime = lastActualStartTime.plus({ seconds: entry.setupSeconds ?? 0 });
      const nextEstimatedStartTime = lastEstimatedStartTime.plus({
        seconds: entry.setupSeconds ?? 0,
      });

      // Estimate is given by entry setup time + estimated time for the content
      const entryEstimatedSeconds =
        (runs[entry.runId!]?.estimateSeconds ?? 0) +
        (interviews[entry.interviewId!]?.estimateSeconds ?? 0);
      // Actual time is _either_ the entry's entire duration, or the estimated time
      const entryActualSeconds = entry.actualSetupSeconds ?? entryEstimatedSeconds;

      lastActualStartTime = nextActualStartTime.plus({ seconds: entryActualSeconds });
      lastEstimatedStartTime = nextEstimatedStartTime.plus({ seconds: entryEstimatedSeconds });

      return {
        ...entry,
        actualStartTime: nextActualStartTime,
        estimatedStartTime: nextEstimatedStartTime,
      };
    });
  },
);
