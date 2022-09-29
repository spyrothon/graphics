import * as React from "react";
import { Outlet } from "react-router-dom";

import Dashboard from "../dashboards/Dashboard";
import DashboardSidebar from "../dashboards/DashboardSidebar";
import PUBLISHING_ROUTES from "./PublishingRoutes";

import styles from "./PublishingDashboard.module.css";

export default function NewslettersDashboard() {
  function renderSidebar() {
    return <DashboardSidebar className={styles.sidebar} routes={PUBLISHING_ROUTES} />;
  }

  function renderMain() {
    return (
      <div className={styles.main}>
        <Outlet />
      </div>
    );
  }

  return <Dashboard fullPage renderSidebar={renderSidebar} renderMain={renderMain} />;
}
