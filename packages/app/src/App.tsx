import * as React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes, useParams } from "react-router-dom";
import { APIClient } from "@spyrothon/api";

import useSafeDispatch from "@app/hooks/useDispatch";

import Newsletter from "./modules/newsletters/Newsletter";
import Newsletters from "./modules/newsletters/Newsletters";
import CurrentScheduleContext from "./modules/schedules/CurrentScheduleContext";
import Schedule from "./modules/schedules/Schedule";
import { fetchSchedule } from "./modules/schedules/ScheduleActions";
import * as ScheduleStore from "./modules/schedules/ScheduleStore";
import { Routes } from "./Constants";
import { useSafeSelector } from "./Store";

function Render(props: { render: () => JSX.Element }) {
  return props.render();
}

export default function App() {
  const schedule = useSafeSelector(ScheduleStore.getSchedule);
  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    (async function () {
      const { scheduleId } = await APIClient.fetchInit();
      dispatch(fetchSchedule(scheduleId));
    })();
  }, [dispatch]);

  return (
    <CurrentScheduleContext.Provider value={{ scheduleId: schedule?.id ?? "-1", schedule }}>
      <BrowserRouter>
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
      </BrowserRouter>
    </CurrentScheduleContext.Provider>
  );
}
