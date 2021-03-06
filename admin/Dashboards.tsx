import * as React from "react";
import { Switch, Route } from "react-router-dom";

import LiveDashboard from "./modules/live/LiveDashboard";
import ScheduleEditor from "./modules/schedules/ScheduleEditor";
import SyncSocketManager from "./modules/sync/SyncSocketManager";
import AdminHelmet from "./AdminHelmet";
import { Routes } from "./Constants";

export default function Dashboards() {
  React.useEffect(() => {
    SyncSocketManager.init();
    return () => SyncSocketManager.stop();
  }, []);

  return (
    <>
      <AdminHelmet />
      <Switch>
        <Route path={Routes.SCHEDULE_EDITOR} component={ScheduleEditor} />
        <Route path={Routes.LIVE_DASHBOARD} component={LiveDashboard} />
      </Switch>
    </>
  );
}
