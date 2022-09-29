import * as React from "react";

import ScheduleStore from "@graphics/modules/schedules/ScheduleStore";
import { useSafeSelector } from "@graphics/Store";
import Layout from "@graphics/uikit/Layout";

import { BreakMessages } from "./BreakConstants";

import styles from "./Break.module.css";

export default function BreakOutro() {
  const schedule = useSafeSelector(ScheduleStore.getSchedule);

  if (schedule == null) return null;

  return (
    <Layout showBackground={false}>
      <div className={styles.breakCountdown}>
        <img className={styles.logo} src={schedule.logoUrl} />
        <div className={styles.backSoon}>
          <div className={styles.backHeader}>
            {schedule.outroTitle ?? BreakMessages.OUTRO_TITLE}
          </div>
          <div className={styles.backSub}>{schedule.outroSubtitle ?? <>&nbsp;</>}</div>
        </div>
      </div>
    </Layout>
  );
}
