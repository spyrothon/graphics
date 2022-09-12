import * as React from "react";
import { Outlet } from "react-router-dom";

import Dashboard from "../dashboards/Dashboard";
import DashboardSidebar from "../dashboards/DashboardSidebar";
import SETTINGS_ROUTES from "./SettingsRoutes";

import styles from "./SettingsDashboard.module.css";

export default function SettingsDashboard() {
  function renderSidebar() {
    return <DashboardSidebar className={styles.sidebar} routes={SETTINGS_ROUTES} />;
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
