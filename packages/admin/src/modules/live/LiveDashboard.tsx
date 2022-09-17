import * as React from "react";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { useSafeSelector } from "../../Store";
import Dashboard from "../dashboards/Dashboard";
import { transitionToSecheduleEntry } from "../schedules/ScheduleActions";
import * as ScheduleStore from "../schedules/ScheduleStore";
import LiveEntryControl from "./LiveEntryControl";
import LiveInterviewInfo from "./LiveInterviewInfo";
import LiveParticipants from "./LiveParticipants";
import LiveRunInfo from "./LiveRunInfo";
import LiveRunTimers from "./LiveRunTimers";
import LiveSidebar from "./LiveSidebar";
import LiveTransitionSection from "./LiveTransitionSection";

import styles from "./LiveDashboard.module.css";

export default function LiveDashboard() {
  const dispatch = useSafeDispatch();

  const { currentEntry, schedule } = useSafeSelector((state) => ({
    currentEntry: ScheduleStore.getCurrentEntryWithDependants(state),
    schedule: ScheduleStore.getSchedule(state),
  }));

  React.useEffect(() => {
    const hasCurrentEntry = currentEntry != null;
    if (hasCurrentEntry) return;
    // Can't do anything if there's no data
    const hasEntries = schedule?.scheduleEntries != null;
    if (schedule == null || !hasEntries) return;

    dispatch(transitionToSecheduleEntry(schedule.id, schedule.scheduleEntries[0].id));
  }, [currentEntry, dispatch, schedule]);

  function renderContentSections() {
    if (currentEntry?.run != null) {
      return (
        <div className={styles.panels}>
          <LiveRunInfo className={styles.panel} run={currentEntry.run} />
          <LiveRunTimers className={styles.panel} run={currentEntry.run} />
          <LiveParticipants className={styles.panel} run={currentEntry.run} />
        </div>
      );
    }

    if (currentEntry?.interviewId != null) {
      return (
        <div className={styles.panels}>
          <LiveInterviewInfo className={styles.panel} interviewId={currentEntry.interviewId} />
        </div>
      );
    }

    return null;
  }

  function renderMain() {
    return (
      <div className={styles.main}>
        <div className={styles.panels}>
          <LiveEntryControl className={styles.panel} />
          <LiveTransitionSection
            className={styles.transitionPanel}
            transitionSet={currentEntry?.enterTransitionSet}
            label="Transition into Content"
            onFinish={() => null}
          />
          {renderContentSections()}
          <LiveTransitionSection
            className={styles.transitionPanel}
            transitionSet={currentEntry?.exitTransitionSet}
            label="Transition to Break"
            onFinish={() => null}
          />
        </div>
      </div>
    );
  }

  return (
    <Dashboard
      fullPage
      renderSidebar={() => <LiveSidebar className={styles.sidebar} />}
      renderMain={renderMain}
    />
  );
}
