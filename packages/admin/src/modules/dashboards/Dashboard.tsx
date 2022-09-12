import * as React from "react";
import { SidebarLayout } from "@spyrothon/uikit";

import DashboardHeader from "../dashboards/DashboardHeader";

type DashboardProps = {
  fullPage?: boolean;
  renderSidebar?: () => React.ReactNode;
  renderMain?: () => React.ReactNode;
  children?: React.ReactNode;
};

export default function Dashboard(props: DashboardProps) {
  return (
    <SidebarLayout
      fullPage={props.fullPage}
      renderHeader={() => <DashboardHeader name="Dashboard" />}
      renderSidebar={props.renderSidebar}
      renderMain={props.children ? () => props.children : props.renderMain ?? (() => null)}
    />
  );
}
