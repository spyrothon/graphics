import * as React from "react";
import classNames from "classnames";

import { useSafeSelector } from "@graphics/Store";

import styles from "./FeedArea.module.css";
import ScheduleStore from "../modules/schedules/ScheduleStore";

type GameFeedAreaProps = {
  className: string;
};

export default function FeedArea(props: GameFeedAreaProps) {
  const areaRef = React.useRef<HTMLDivElement>(null);

  const debug = useSafeSelector((state) => ScheduleStore.getSchedule(state)?.debug ?? true);

  const [size, setSize] = React.useState([0, 0]);
  const [position, setPosition] = React.useState({ top: 0, right: 0, bottom: 0, left: 0 });

  React.useLayoutEffect(() => {
    const area = areaRef.current;
    if (area == null) return;

    const areaRect = area.getBoundingClientRect();

    const width = areaRect.width - 4;
    const height = areaRect.height - 4;
    const top = areaRect.top + 2;
    const left = areaRect.left + 2;
    const bottom = areaRect.top + areaRect.height - 2;
    const right = areaRect.left + areaRect.width - 2;

    if (width !== size[0] || height !== size[1]) {
      setSize([width, height]);
    }

    if (
      top !== position.top ||
      right !== position.right ||
      bottom !== position.bottom ||
      right !== position.left
    ) {
      setPosition({
        top,
        right,
        bottom,
        left,
      });
    }
  }, []);

  const [width, height] = size;
  const { top, right, bottom, left } = position;

  return (
    <div ref={areaRef} className={classNames(styles.feed, props.className)}>
      {debug ? (
        <>
          <div className={styles.topLeft}>
            ({left}, {top})
          </div>
          <div className={styles.topRight}>
            ({right}, {top})
          </div>
          <div className={styles.sizeText}>
            {width} x {height}
          </div>
          <div className={styles.bottomLeft}>
            ({left}, {bottom})
          </div>
          <div className={styles.bottomRight}>
            ({right}, {bottom})
          </div>
        </>
      ) : null}
    </div>
  );
}
