import * as React from "react";

import { useSafeSelector } from "@graphics/Store";
import ScheduleStore from "@graphics/modules/schedules/ScheduleStore";
import Layout from "@graphics/uikit/Layout";

import styles from "./Break.module.css";
import { BreakMessages } from "./BreakConstants";

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
