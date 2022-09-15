import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../dashboards/Dashboard";
import DashboardSidebar from "../dashboards/DashboardSidebar";
import SETTINGS_ROUTES from "./SettingsRoutes";

import styles from "./SettingsDashboard.mod.css";

export default function SettingsDashboard() {
  function renderSidebar() {
    return <DashboardSidebar className={styles.sidebar} routes={SETTINGS_ROUTES} />;
  }

  function renderMain() {
    return (
      <div className={styles.main}>
        <Switch>
          {SETTINGS_ROUTES.map((item) => (
            <Route key={item.id} path={item.route} exact={item.exact} render={item.render} />
          ))}
        </Switch>
      </div>
    );
  }

  return <Dashboard fullPage renderSidebar={renderSidebar} renderMain={renderMain} />;
}