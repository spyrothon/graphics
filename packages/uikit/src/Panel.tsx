import * as React from "react";
import classNames from "classnames";

import { Header } from "./Header";

import styles from "./Panel.module.css";

type PanelProps = {
  name?: string;
  className?: string;
  children: React.ReactNode;
};

export function Panel(props: PanelProps) {
  const { name, className, children } = props;
  return (
    <div className={classNames(styles.panel, className)}>
      <Header size={Header.Sizes.H2}>{name}</Header>
      {children}
    </div>
  );
}
