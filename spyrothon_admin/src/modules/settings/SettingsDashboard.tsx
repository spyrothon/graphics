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
    return <Outlet />;
  }

  return <Dashboard renderSidebar={renderSidebar} renderMain={renderMain} />;
}
