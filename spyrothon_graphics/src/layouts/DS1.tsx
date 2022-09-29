import * as React from "react";

import GameInfo from "@graphics/modules/game-info/GameInfo";
import Omnibar from "@graphics/modules/omnibar/Omnibar";
import RunStore from "@graphics/modules/runs/RunStore";
import RunUtils from "@graphics/modules/runs/RunUtils";
import ScheduleStore from "@graphics/modules/schedules/ScheduleStore";
import RunTimer from "@graphics/modules/time/RunTimer";
import { useSafeSelector } from "@graphics/Store";
import FeedArea from "@graphics/uikit/FeedArea";
import Layout from "@graphics/uikit/Layout";
import NameplateGroup from "@graphics/uikit/NameplateGroup";

import styles from "./DS1.module.css";

export default function DS1() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [] } = currentRun ?? {};

  return (
    <Layout>
      <div className={styles.sidebar}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        <FeedArea className={styles.webcam} />
        <div className={styles.participantsTimer}>
          {currentRun != null ? <RunTimer run={currentRun} className={styles.timer} /> : null}
          <NameplateGroup
            className={styles.runners}
            participants={RunUtils.getVisibleParticipants(runners)}
            title="Runners"
          />
        </div>
      </div>
      <FeedArea className={styles.game1} />
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
