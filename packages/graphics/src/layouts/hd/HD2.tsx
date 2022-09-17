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
import Nameplate from "@graphics/uikit/Nameplate";
import NameplateGroup from "@graphics/uikit/NameplateGroup";

import styles from "./HD2.module.css";

export default function HD2() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [], commentators = [] } = currentRun ?? {};
  const showWebcam = RunUtils.hasAnyWebcam(currentRun);
  const [left, right] = RunUtils.getVisibleParticipants(runners);
  const visibleCommentators = RunUtils.getVisibleParticipants(commentators);

  return (
    <Layout>
      <FeedArea className={styles.game1} />
      <FeedArea className={styles.game2} />

      <div className={styles.topStack}>
        <div className={styles.participantsTimer}>
          {left != null ? <Nameplate className={styles.nameplateLeft} participant={left} /> : null}
          {currentRun != null ? <RunTimer run={currentRun} className={styles.timer} /> : null}
          {right != null ? (
            <Nameplate className={styles.nameplateRight} participant={right} />
          ) : null}
        </div>
      </div>

      <div className={styles.infoLeft}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        {showWebcam && visibleCommentators.length > 0 ? (
          <div className={styles.commentaryAreaLeft}>
            <NameplateGroup
              className={styles.commentators}
              participants={visibleCommentators}
              title="Commentary"
            />
          </div>
        ) : null}
      </div>
      {showWebcam ? <FeedArea className={styles.webcam} /> : null}
      {!showWebcam && visibleCommentators.length > 0 ? (
        <div className={styles.commentaryAreaMiddle}>
          <NameplateGroup
            className={styles.commentators}
            participants={visibleCommentators}
            title="Commentary"
          />
        </div>
      ) : null}

      <ArtRotation className={styles.artRotation} />

      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
