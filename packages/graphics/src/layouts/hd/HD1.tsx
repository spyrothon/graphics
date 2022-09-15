import * as React from "react";

import { useSafeSelector } from "@graphics/Store";
import GameInfo from "@graphics/modules/game-info/GameInfo";
import Omnibar from "@graphics/modules/omnibar/Omnibar";
import RunStore from "@graphics/modules/runs/RunStore";
import RunUtils from "@graphics/modules/runs/RunUtils";
import ScheduleStore from "@graphics/modules/schedules/ScheduleStore";
import RunTimer from "@graphics/modules/time/RunTimer";
import FeedArea from "@graphics/uikit/FeedArea";
import Layout from "@graphics/uikit/Layout";
import NameplateGroup from "@graphics/uikit/NameplateGroup";

import styles from "./HD1.module.css";
import ArtRotation from "@graphics/modules/art/ArtRotation";

export default function HD1() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [], commentators = [] } = currentRun ?? {};
  const showWebcam = RunUtils.hasAnyWebcam(currentRun);
  const visibleCommentators = RunUtils.getVisibleParticipants(commentators);

  return (
    <Layout>
      <div className={styles.sidebar}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        {showWebcam ? <FeedArea className={styles.webcam} /> : null}
        <ArtRotation className={styles.artRotation} />
        {!showWebcam && visibleCommentators.length > 0 ? (
          <div className={styles.commentaryAreaLeft}>
            <NameplateGroup
              className={styles.commentators}
              participants={visibleCommentators}
              title="Commentary"
            />
          </div>
        ) : null}
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.timerArea}>
          {currentRun != null ? <RunTimer run={currentRun} className={styles.timer} /> : null}
        </div>
        <NameplateGroup
          className={styles.runners}
          participants={RunUtils.getVisibleParticipants(runners)}
          title="Runners"
        />
        {showWebcam && visibleCommentators.length > 0 ? (
          <div className={styles.commentaryArea}>
            <NameplateGroup
              className={styles.commentators}
              participants={visibleCommentators}
              title="Commentary"
            />
          </div>
        ) : null}
      </div>
      <FeedArea className={styles.game1} />
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
