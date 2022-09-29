import * as React from "react";
import classNames from "classnames";
import { Run } from "@spyrothon/api";

import Category from "@graphics/uikit/Category";
import GameName from "@graphics/uikit/GameName";

import * as DurationUtils from "../time/DurationUtils";

import styles from "./GameInfo.module.css";

type GameInfoProps = {
  run: Run;
  className?: string;
};

export default function GameInfo(props: GameInfoProps) {
  const { run, className } = props;
  const { gameNameFormatted, categoryName, releaseYear, platform, estimateSeconds } = run;

  return (
    <div className={classNames(styles.container, className)}>
      <GameName className={styles.gameName} name={gameNameFormatted} />
      <Category className={styles.categoryName}>{categoryName}</Category>
      <div className={styles.runInfo}>
        <div className={styles.releaseYear}>
          <span className={styles.descriptor}>RELEASED: </span>
          <span className={styles.value}>{releaseYear}</span>
        </div>
        <div className={styles.platform}>
          <span className={styles.descriptor}>PLATFORM: </span>
          <span className={styles.value}>{platform}</span>
        </div>
        {estimateSeconds != null ? (
          <div className={styles.estimate}>
            <span className={styles.descriptor}>ESTIMATE: </span>
            <span className={styles.value}>{DurationUtils.toString(estimateSeconds)}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
