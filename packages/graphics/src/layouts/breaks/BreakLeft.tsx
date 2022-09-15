import * as React from "react";

import { useSafeSelector } from "@graphics/Store";
import ArtRotation from "@graphics/modules/art/ArtRotation";
import Omnibar from "@graphics/modules/omnibar/Omnibar";
import ScheduleStore from "@graphics/modules/schedules/ScheduleStore";
import Layout from "@graphics/uikit/Layout";
import BreakUpNext from "./BreakUpNext";

import styles from "./Break.module.css";
import { BreakMessages } from "./BreakConstants";

export default function BreakLeft() {
  const schedule = useSafeSelector(ScheduleStore.getSchedule);

  if (schedule == null) return null;

  return (
    <Layout showBackground={false}>
      <div className={styles.breakLeft}>
        <img className={styles.logo} src={schedule.logoUrl} />
        <BreakUpNext className={styles.upcoming} />
        <div className={styles.backSoon}>
          <div className={styles.backHeader}>
            {schedule.breakLeftTitle ?? BreakMessages.BREAK_TITLE}
          </div>
          <div className={styles.backSub}>
            {schedule.breakLeftSubtitle ?? BreakMessages.BREAK_SUBTITLE}
          </div>
        </div>
      </div>
      <ArtRotation className={styles.artRotation} />
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
