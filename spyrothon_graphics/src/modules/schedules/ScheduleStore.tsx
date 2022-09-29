import { DateTime } from "luxon";
import { createSelector } from "reselect";

import { StoreState } from "@graphics/Store";

import InterviewStore from "../interviews/InterviewStore";
import RunStore from "../runs/RunStore";
import type { ScheduleEntryWithTimes } from "./ScheduleTypes";

const getSchedulesState = (globalState: StoreState) => globalState.schedules;

const isFetchingSchedule = createSelector([getSchedulesState], (state) => state.fetching);

const getScheduleStartTime = createSelector([], () => DateTime.fromISO("2020-11-06T23:30:00Z"));

const getSchedule = (state: StoreState) => getSchedulesState(state).schedule;
const getScheduleEntries = createSelector(
  [getSchedulesState],
  (state) => state.schedule?.scheduleEntries ?? [],
);

const getCurrentEntryId = (state: StoreState) => getSchedule(state)?.currentEntryId;
const getCurrentEntry = createSelector(
  [getScheduleEntries, getCurrentEntryId],
  (entries, entryId) => entries.find((entry) => entry.id === entryId),
);

const getSelectedEntryId = createSelector([getSchedulesState], (state) => state.selectedEntryId);
const getSelectedEntry = createSelector(
  [getScheduleEntries, getSelectedEntryId],
  (entries, selectedId) => entries.find((entry) => entry.id === selectedId),
);

const getEntriesWithStartTimes = createSelector(
  [
    getScheduleStartTime,
    getScheduleEntries,
    RunStore.getRunsById,
    InterviewStore.getInterviewsById,
  ],
  (scheduleStartTime, entries, runs, interviews) => {
    const scheduleStart = scheduleStartTime!;

    let lastActualStartTime = scheduleStart;
    let lastEstimatedStartTime = scheduleStart;

    return entries.map((entry): ScheduleEntryWithTimes => {
      const nextActualStartTime = lastActualStartTime.plus({ seconds: entry.setupSeconds ?? 0 });
      const nextEstimatedStartTime = lastEstimatedStartTime.plus({
        seconds: entry.setupSeconds ?? 0,
      });

      if (entry.runId != null) {
        const run = runs[entry.runId];
        if (run != null) {
          lastActualStartTime = nextActualStartTime.plus({
            seconds: run.actualSeconds ?? run.estimateSeconds,
          });
          lastEstimatedStartTime = nextEstimatedStartTime.plus({ seconds: run.estimateSeconds });
        }
      }
      if (entry.interviewId != null) {
        const interview = interviews[entry.interviewId];
        if (interview != null) {
          lastActualStartTime = nextActualStartTime.plus({ seconds: interview.estimateSeconds });
          lastEstimatedStartTime = nextEstimatedStartTime.plus({
            seconds: interview.estimateSeconds,
          });
        }
      }

      return {
        ...entry,
        actualStartTime: nextActualStartTime,
        estimatedStartTime: nextEstimatedStartTime,
      };
    });
  },
);

const getUpcomingEntries = createSelector(
  [getEntriesWithStartTimes, getCurrentEntryId],
  (entries, currentEntryId) => {
    const currentIndex = entries.findIndex((entry) => entry.id === currentEntryId);

    return entries.slice(currentIndex);
  },
);

export default {
  isFetchingSchedule,
  getScheduleStartTime,
  getSchedule,
  getScheduleEntries,
  getCurrentEntryId,
  getCurrentEntry,
  getSelectedEntryId,
  getSelectedEntry,
  getEntriesWithStartTimes,
  getUpcomingEntries,
};
