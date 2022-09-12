import * as React from "react";
import classNames from "classnames";

import styles from "./StatusDot.module.css";

type StatusDotProps = {
  boolean?: boolean;
  busy?: boolean;
};

export function StatusDot(props: StatusDotProps) {
  const { boolean, busy } = props;

  return (
    <div
      className={classNames(styles.dot, {
        [styles.busy]: busy,
        [styles.good]: boolean,
        [styles.bad]: !boolean,
      })}
    />
  );
}
