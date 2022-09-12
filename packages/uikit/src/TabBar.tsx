import * as React from "react";
import classNames from "classnames";

import { Button } from "./Button";

import styles from "./TabBar.module.css";

export type TabBarItem = { id: string; content: React.ReactNode };

interface TabBarProps {
  items: Array<TabBarItem>;
  activeId: string;
  className?: string;
  onChange?: (activeId: string) => void;
}

export function TabBar(props: TabBarProps) {
  const { items, activeId, className, onChange } = props;
  return (
    <div className={classNames(styles.container, className)}>
      {items.map(({ id, content }) => (
        <Button
          key={id}
          className={styles.tab}
          look={id === activeId ? Button.Looks.FILLED : Button.Looks.OUTLINED}
          onClick={() => onChange?.(id)}>
          {content}
        </Button>
      ))}
    </div>
  );
}
