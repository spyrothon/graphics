import * as React from "react";
import { Stack } from "@spyrothon/sparx";

import DashboardHeader from "../dashboards/DashboardHeader";

import styles from "./Dashboard.module.css";

type DashboardProps = {
  renderSidebar?: () => React.ReactNode;
  renderMain: () => React.ReactNode;
  children?: React.ReactNode;
};

export default function Dashboard(props: DashboardProps) {
  return (
    <Stack spacing="space-none" className={styles.container}>
      <div className={styles.header}>
        <DashboardHeader name="Dashboard" />
      </div>
      <Stack spacing="space-none" direction="horizontal" className={styles.content}>
        {props.renderSidebar != null ? (
          <div className={styles.sidebar}>{props.renderSidebar()}</div>
        ) : null}
        <div className={styles.main}>{props.renderMain()}</div>
      </Stack>
    </Stack>
  );
}
