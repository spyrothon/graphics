import * as React from "react";
import { Routes as RouterRoutes, Route, useRoutes } from "react-router-dom";

import { APIClient } from "@spyrothon/api";

import { Routes } from "./Constants";
import useSafeDispatch from "@admin/hooks/useDispatch";
import { loadSession } from "./modules/auth/AuthActions";
import AuthLogin from "./modules/auth/AuthLogin";
import AuthLogout from "./modules/auth/AuthLogout";
import SettingsDashboard from "./modules/settings/SettingsDashboard";
import LiveDashboard from "./modules/live/LiveDashboard";
import PublishingDashboard from "./modules/publishing/PublishingDashboard";
import ScheduleEditor from "./modules/schedules/ScheduleEditor";
import { fetchSchedule, fetchScheduleOBSConfig } from "./modules/schedules/ScheduleActions";
import * as ScheduleStore from "./modules/schedules/ScheduleStore";
import AdminAuthenticated from "./AdminAuthenticated";
import { useSafeSelector } from "./Store";
import OBSManager from "./modules/obs/OBSManager";
import CurrentScheduleContext from "./modules/schedules/CurrentScheduleContext";
import SETTINGS_ROUTES from "./modules/settings/SettingsRoutes";
import PUBLISHING_ROUTES from "./modules/publishing/PublishingRoutes";

export default function App() {
  const schedule = useSafeSelector(ScheduleStore.getSchedule);
  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    (async function() {
      dispatch(loadSession());
      const { scheduleId } = await APIClient.fetchInit();
      dispatch(fetchSchedule(scheduleId));
      dispatch(fetchScheduleOBSConfig(scheduleId));
    })();
  }, []);

  React.useEffect(() => {
    OBSManager.init();
    return () => {
      OBSManager.destroy();
    };
  }, []);

  if (schedule == null) return <div>Loading App</div>;

  return (
    <CurrentScheduleContext.Provider value={{ scheduleId: schedule.id, schedule }}>
      <RouterRoutes>
        <Route path={Routes.LOGIN} element={<AuthLogin />} />
        <Route path={Routes.LOGOUT} element={<AuthLogout />} />
        <Route element={<AdminAuthenticated />}>
          <Route path={Routes.SCHEDULE_EDITOR} element={<ScheduleEditor />} />
          <Route path={Routes.LIVE_DASHBOARD} element={<LiveDashboard />} />
          <Route path={Routes.SETTINGS} element={<SettingsDashboard />}>
            {SETTINGS_ROUTES.map((item) => (
              <Route
                key={item.id}
                path={item.path === Routes.SETTINGS ? "" : item.path}
                element={item.element}
              />
            ))}
          </Route>
          <Route path={Routes.PUBLISHING} element={<PublishingDashboard />}>
            {PUBLISHING_ROUTES.map((item) => (
              <Route
                key={item.id}
                path={item.path === Routes.PUBLISHING ? "" : item.path}
                element={item.element}
              />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<div>Not Found</div>} />
      </RouterRoutes>
    </CurrentScheduleContext.Provider>
  );
}
