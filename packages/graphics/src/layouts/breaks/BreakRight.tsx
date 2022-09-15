import * as React from "react";

import { useSafeSelector } from "@graphics/Store";
import ArtRotation from "@graphics/modules/art/ArtRotation";
import Omnibar from "@graphics/modules/omnibar/Omnibar";
import ScheduleStore from "@graphics/modules/schedules/ScheduleStore";
import Layout from "@graphics/uikit/Layout";
import BreakUpNext from "./BreakUpNext";

import styles from "./Break.module.css";
import { BreakMessages } from "./BreakConstants";

export default function BreakRight() {
  const schedule = useSafeSelector(ScheduleStore.getSchedule);

  if (schedule == null) return null;

  return (
    <Layout showBackground={false}>
      <div className={styles.breakRight}>
        <img className={styles.logo} src={schedule.logoUrl} />
        <BreakUpNext className={styles.upcoming} reverse />
        <div className={styles.backSoon}>
          <div className={styles.backHeader}>
            {schedule.breakRightTitle ?? BreakMessages.BREAK_TITLE}
          </div>
          <div className={styles.backSub}>
            {schedule.breakRightSubtitle ?? BreakMessages.BREAK_SUBTITLE}
          </div>
        </div>
      </div>
      <ArtRotation className={styles.artRotationRight} />
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
