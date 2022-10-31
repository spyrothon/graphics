import * as React from "react";
import classNames from "classnames";
import { Location, Route, Routes as RouterRoutes, useLocation, useParams } from "react-router-dom";
import { useThemeClass } from "@spyrothon/sparx";

import useSafeDispatch from "@app/hooks/useDispatch";

import PublicHelmet from "./modules/core/PublicHelmet";
import Newsletter from "./modules/newsletters/Newsletter";
import Newsletters from "./modules/newsletters/Newsletters";
import { fetchParticipants } from "./modules/participants/ParticipantActions";
import CurrentScheduleContext from "./modules/schedules/CurrentScheduleContext";
import Schedule from "./modules/schedules/Schedule";
import { fetchSchedule } from "./modules/schedules/ScheduleActions";
import * as ScheduleStore from "./modules/schedules/ScheduleStore";
import API from "./API";
import { Routes } from "./Constants";
import { useSafeSelector } from "./Store";

import styles from "./App.module.css";

function Render(props: { render: () => JSX.Element }) {
  return props.render();
}

const TRANSPARENT_ROUTES = [Routes.SCHEDULE, Routes.BASE_PATH];

function getBodyClassForLocation(location: Location) {
  if (TRANSPARENT_ROUTES.includes(location.pathname)) return undefined;

  return styles.background;
}

export default function App() {
  const schedule = useSafeSelector(ScheduleStore.getSchedule);
  const dispatch = useSafeDispatch();

  const themeClass = useThemeClass();
  const location = useLocation();

  React.useEffect(() => {
    (async function () {
      const { scheduleId } = await API.init.fetchInit();
      await fetchParticipants();
      dispatch(fetchSchedule(scheduleId));
    })();
  }, [dispatch]);

  return (
    <CurrentScheduleContext.Provider value={{ scheduleId: schedule?.id ?? "-1", schedule }}>
      <PublicHelmet className={classNames(themeClass, getBodyClassForLocation(location))} />
      <RouterRoutes>
        <Route path={Routes.NEWSLETTERS} element={<Newsletters />} />
        <Route
          path={Routes.NEWSLETTER(":id")}
          element={
            <Render
              render={() => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const params = useParams<{ id: string }>();
                return <Newsletter newsletterId={params.id!} />;
              }}
            />
          }
        />
        <Route path={Routes.SCHEDULE} element={<Schedule />} />
        <Route path={Routes.BASE_PATH} element={<Schedule />} />
        <Route path="*" element={<div>Not Found</div>} />
      </RouterRoutes>
    </CurrentScheduleContext.Provider>
  );
}
