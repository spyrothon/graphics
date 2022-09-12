import * as React from "react";

import styles from "./ThemeProvider.module.css";

export function ThemeProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  return <div className={styles.theme}>{children}</div>;
}
