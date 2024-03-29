import * as React from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { Accent, AppContainer, Theme } from "@spyrothon/sparx";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { loadSession } from "./modules/auth/AuthActions";
import AuthLogin from "./modules/auth/AuthLogin";
import AuthLogout from "./modules/auth/AuthLogout";
import AuthStore from "./modules/auth/AuthStore";
import { fetchInterviewsSuccess } from "./modules/interviews/InterviewActions";
import LiveDashboard from "./modules/live/LiveDashboard";
import OBSManager from "./modules/obs/OBSManager";
import { loadParticipants } from "./modules/participants/ParticipantStore";
import PublishingDashboard from "./modules/publishing/PublishingDashboard";
import PUBLISHING_ROUTES from "./modules/publishing/PublishingRoutes";
import { fetchRunsSuccess } from "./modules/runs/RunActions";
import CurrentScheduleContext from "./modules/schedules/CurrentScheduleContext";
import { loadOBSConfig, loadSchedule } from "./modules/schedules/ScheduleActions";
import ScheduleEditor from "./modules/schedules/ScheduleEditor";
import * as ScheduleStore from "./modules/schedules/ScheduleStore";
import SettingsDashboard from "./modules/settings/SettingsDashboard";
import SETTINGS_ROUTES from "./modules/settings/SettingsRoutes";
import AdminAuthenticated from "./AdminAuthenticated";
import API from "./API";
import { Routes } from "./Constants";
import { useSafeSelector } from "./Store";

export default function App() {
  const schedule = useSafeSelector(ScheduleStore.getSchedule);
  const dispatch = useSafeDispatch();
  const user = useSafeSelector(AuthStore.getUser);

  React.useEffect(() => {
    (async function () {
      dispatch(loadSession());
      const { schedule, obsConfig, participants } = await API.init.fetchAdminInit();
      loadParticipants(participants);
      dispatch(loadSchedule(schedule));
      dispatch(fetchRunsSuccess(schedule.runs));
      dispatch(fetchInterviewsSuccess(schedule.interviews));
      dispatch(loadOBSConfig(obsConfig));
    })();
  }, [dispatch]);

  React.useEffect(() => {
    OBSManager.init();
    return () => {
      OBSManager.destroy();
    };
  }, []);

  if (schedule == null) return <div>Loading App</div>;

  return (
    <AppContainer accent={Accent.PINK} theme={(user?.theme as Theme) ?? Theme.LIGHT}>
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
          <Route path={Routes.BASE_PATH} element={<Navigate to={Routes.LIVE_DASHBOARD} />} />
        </RouterRoutes>
      </CurrentScheduleContext.Provider>
    </AppContainer>
  );
}
