import * as React from "react";
import { ScheduleEntryType } from "@spyrothon/api";
import { Tab, Tabs } from "@spyrothon/uikit";

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
  const [activeTab, setActiveTab] = React.useState("content");

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
        return <RunEditor scheduleEntry={selectedScheduleEntry} className={styles.main} />;
      case ScheduleEntryType.INTERVIEW:
        return <InterviewEditor scheduleEntry={selectedScheduleEntry} className={styles.main} />;
      default:
        return null;
    }
  }

  function renderMain() {
    return (
      <Tabs className={styles.main} activeTab={activeTab} onTabChange={setActiveTab}>
        <Tab id="content" label="Content">
          {renderContentEditor()}
        </Tab>
        {selectedScheduleEntry != null ? (
          <Tab id="meta" label="Meta">
            <ScheduleEntryEditor scheduleEntry={selectedScheduleEntry} />
          </Tab>
        ) : undefined}
      </Tabs>
    );
  }

  return <Dashboard renderSidebar={renderSidebar} renderMain={renderMain} />;
}
