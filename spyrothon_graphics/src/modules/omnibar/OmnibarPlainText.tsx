import * as React from "react";
import classNames from "classnames";

import styles from "./OmnibarPlainText.module.css";

type OmnibarPlainTextProps = {
  text: React.ReactNode;
  className?: string;
};

export default function OmnibarPlainText(props: OmnibarPlainTextProps) {
  const { text, className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
