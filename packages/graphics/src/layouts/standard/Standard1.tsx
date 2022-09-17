import * as React from "react";

import ArtRotation from "@graphics/modules/art/ArtRotation";
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

import styles from "./Standard1.module.css";

export default function Standard1() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [], commentators = [] } = currentRun ?? {};
  const visibleCommentators = RunUtils.getVisibleParticipants(commentators);
  const showWebcam = RunUtils.hasAnyWebcam(currentRun);

  return (
    <Layout>
      <div className={styles.sidebar}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        {showWebcam ? <FeedArea className={styles.webcam} /> : null}
        <div className={styles.participantsTimer}>
          <NameplateGroup
            className={styles.runners}
            participants={RunUtils.getVisibleParticipants(runners)}
            title="Runners"
          />
          {currentRun != null ? <RunTimer run={currentRun} className={styles.timer} /> : null}
          {visibleCommentators.length > 0 ? (
            <div className={styles.commentaryArea}>
              <NameplateGroup
                className={styles.commentators}
                participants={visibleCommentators}
                title="Commentary"
              />
            </div>
          ) : showWebcam ? (
            <div className={styles.spacer} />
          ) : null}
        </div>
        {!showWebcam ? <ArtRotation className={styles.artRotation} /> : null}
      </div>
      <FeedArea className={styles.game1} />
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
