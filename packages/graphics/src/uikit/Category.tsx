import * as React from "react";
import classNames from "classnames";

import styles from "./Category.module.css";

type CategoryProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Category(props: CategoryProps) {
  const { children, className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.text}>{children}</div>
    </div>
  );
}
