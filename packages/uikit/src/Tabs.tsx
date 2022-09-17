import * as React from "react";

import { TabBar, TabBarItem } from "./TabBar";

import styles from "./Tabs.module.css";

interface TabProps {
  id: string;
  label: React.ReactNode;
  children: React.ReactNode;
}

type TabMap = Map<string, TabProps>;

export function Tab(_props: TabProps) {
  return null;
}

interface TabsProps {
  activeTab: string;
  children: Array<React.ReactElement<any, typeof Tab> | undefined>;
  className?: string;
  onTabChange: (tabId: string) => void;
}

export function Tabs(props: TabsProps) {
  const { activeTab, children, className, onTabChange } = props;

  const tabMap: TabMap = new Map();
  React.Children.forEach(children, (child) => {
    if (child == null) return;
    tabMap.set(child.props.id, child.props);
  });

  const tabBarItems: TabBarItem[] = [];
  for (const tab of tabMap.values()) {
    tabBarItems.push({ id: tab.id, content: tab.label });
  }

  return (
    <div className={className}>
      <TabBar
        className={styles.tabBar}
        items={tabBarItems}
        activeId={activeTab}
        onChange={onTabChange}
      />
      {tabMap.get(activeTab)?.children}
    </div>
  );
}
