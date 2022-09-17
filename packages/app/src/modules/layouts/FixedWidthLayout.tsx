import * as React from "react";
import classNames from "classnames";

import styles from "./Layout.module.css";

interface FixedWidthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function FixedWidthLayout(props: FixedWidthLayoutProps) {
  const { children, className } = props;

  return <div className={classNames(styles.fixedWidth, className)}>{children}</div>;
}
