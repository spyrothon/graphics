import * as React from "react";
import classNames from "classnames";

import styles from "./SidebarLayout.module.css";

type SidebarLayoutProps = {
  renderHeader?: () => React.ReactNode;
  renderSidebar?: () => React.ReactNode;
  renderMain: () => React.ReactNode;
  fullPage?: boolean;
};

export function SidebarLayout(props: SidebarLayoutProps) {
  const { renderHeader, renderSidebar, renderMain, fullPage } = props;
  return (
    <div className={styles.layout}>
      {renderHeader != null ? <div className={styles.header}>{renderHeader()}</div> : null}
      <div className={classNames(styles.content, { [styles.fullPage]: fullPage })}>
        {renderSidebar != null ? <div className={styles.sidebar}>{renderSidebar()}</div> : null}
        <div className={styles.main}>{renderMain()}</div>
      </div>
    </div>
  );
}
