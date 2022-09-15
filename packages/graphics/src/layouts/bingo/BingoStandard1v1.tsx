import * as React from "react";

import { useSafeSelector } from "@graphics/Store";
import BingoBoard from "@graphics/modules/bingo/BingoBoard";
import Omnibar from "@graphics/modules/omnibar/Omnibar";
import GameInfo from "@graphics/modules/game-info/GameInfo";
import RunStore from "@graphics/modules/runs/RunStore";
import RunUtils from "@graphics/modules/runs/RunUtils";
import ScheduleStore from "@graphics/modules/schedules/ScheduleStore";
import RunTimer from "@graphics/modules/time/RunTimer";
import FeedArea from "@graphics/uikit/FeedArea";
import Layout from "@graphics/uikit/Layout";
import Nameplate from "@graphics/uikit/Nameplate";
import NameplateGroup from "@graphics/uikit/NameplateGroup";

import styles from "./BingoStandard1v1.module.css";
import ArtRotation from "@graphics/modules/art/ArtRotation";

export default function BingoStandard1v1() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [], commentators = [] } = currentRun ?? {};
  const [left, right] = RunUtils.getVisibleParticipants(runners);
  const visibleCommentators = RunUtils.getVisibleParticipants(commentators);

  return (
    <Layout>
      <FeedArea className={styles.game1} />
      <BingoBoard className={styles.bingoBoard} />
      <FeedArea className={styles.game2} />

      <div className={styles.centerStack}>
        <div className={styles.participantsTimer}>
          {left != null ? <Nameplate className={styles.nameplateLeft} participant={left} /> : null}
          {currentRun != null ? <RunTimer run={currentRun} className={styles.timer} /> : null}
          {right != null ? (
            <Nameplate className={styles.nameplateRight} participant={right} />
          ) : null}
        </div>
      </div>

      <div className={styles.infoRow}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        {visibleCommentators.length > 0 ? (
          <div className={styles.commentaryArea}>
            <NameplateGroup
              className={styles.commentators}
              participants={visibleCommentators}
              title="Commentary"
            />
          </div>
        ) : null}
        <ArtRotation className={styles.artRotation} />
      </div>
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
