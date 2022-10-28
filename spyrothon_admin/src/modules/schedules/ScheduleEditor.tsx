import * as React from "react";
import { ScheduleEntryType } from "@spyrothon/api";
import { Stack } from "@spyrothon/sparx";

import { useSafeSelector } from "../../Store";
import Dashboard from "../dashboards/Dashboard";
import InterviewEditor from "../interviews/InterviewEditor";
import RunEditor from "../runs/RunEditor";
import ScheduleEntryEditor from "./ScheduleEntryEditor";
import ScheduleList from "./ScheduleList";
import * as ScheduleStore from "./ScheduleStore";

import styles from "./ScheduleEditor.module.css";

export default function ScheduleEditor() {
  const selectedScheduleEntry = useSafeSelector((state) => ScheduleStore.getSelectedEntry(state));

  const entryType =
    selectedScheduleEntry?.runId != null
      ? ScheduleEntryType.RUN
      : selectedScheduleEntry?.interviewId != null
      ? ScheduleEntryType.INTERVIEW
      : undefined;

  function renderSidebar() {
    return <ScheduleList className={styles.sidebar} />;
  }

  function renderContentEditor() {
    if (selectedScheduleEntry == null) return null;

    switch (entryType) {
      case ScheduleEntryType.RUN:
        return <RunEditor scheduleEntry={selectedScheduleEntry} />;
      case ScheduleEntryType.INTERVIEW:
        return <InterviewEditor scheduleEntry={selectedScheduleEntry} />;
      default:
        return null;
    }
  }

  function renderMain() {
    return (
      <Stack spacing="space-xl" className={styles.main}>
        {renderContentEditor()}
        {selectedScheduleEntry != null ? (
          <ScheduleEntryEditor scheduleEntry={selectedScheduleEntry} />
        ) : undefined}
      </Stack>
    );
  }

  return <Dashboard renderSidebar={renderSidebar} renderMain={renderMain} />;
}
