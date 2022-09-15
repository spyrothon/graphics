import * as React from "react";
import classNames from "classnames";

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

import styles from "./BingoStandard2v2.module.css";

export default function BingoStandard2v2() {
  const currentRun = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return RunStore.getRun(state, { runId: entry.runId });
  });

  const { runners = [] } = currentRun ?? {};
  const [topLeft, topRight, bottomLeft, bottomRight] = RunUtils.getVisibleParticipants(runners);

  return (
    <Layout>
      <FeedArea className={styles.game1} />
      <FeedArea className={styles.game2} />
      <FeedArea className={styles.game3} />
      <FeedArea className={styles.game4} />

      <div className={styles.centerStack}>
        {currentRun != null ? <GameInfo className={styles.gameInfo} run={currentRun} /> : null}
        {topLeft != null ? (
          <Nameplate
            className={classNames(styles.nameplate, styles.nameplateTopLeft)}
            participant={topLeft}
          />
        ) : null}
        {currentRun != null ? <RunTimer run={currentRun} className={styles.timer} /> : null}
        {topRight != null ? (
          <Nameplate
            className={classNames(styles.nameplate, styles.nameplateTopRight)}
            participant={topRight}
          />
        ) : null}
        {bottomLeft != null ? (
          <Nameplate
            className={classNames(styles.nameplate, styles.nameplateBottomLeft)}
            participant={bottomLeft}
          />
        ) : null}
        <BingoBoard className={styles.bingoBoard} />
        {bottomRight != null ? (
          <Nameplate
            className={classNames(styles.nameplate, styles.nameplateBottomRight)}
            participant={bottomRight}
          />
        ) : null}
      </div>

      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
