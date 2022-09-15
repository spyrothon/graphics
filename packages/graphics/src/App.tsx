import * as React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";

import { APIClient } from "@spyrothon/api";

import { Routes } from "./Constants";
import useSafeDispatch from "./hooks/useDispatch";
import DS1 from "./layouts/DS1";
import FiveFour1 from "./layouts/FiveFour1";
import GBA1 from "./layouts/GBA1";
import OmnibarOnly from "./layouts/OmnibarOnly";
import BingoStandard1v1 from "./layouts/bingo/BingoStandard1v1";
import BingoStandard2v2 from "./layouts/bingo/BingoStandard2v2";
import BreakCountdown from "./layouts/breaks/BreakCountdown";
import BreakLeft from "./layouts/breaks/BreakLeft";
import BreakRight from "./layouts/breaks/BreakRight";
import BreakOutro from "./layouts/breaks/BreakOutro";
import HD1 from "./layouts/hd/HD1";
import HD2 from "./layouts/hd/HD2";
import InterviewOpen from "./layouts/interview/InterviewOpen";
import QuizCorner from "./layouts/interview/QuizCorner";
import Standard1 from "./layouts/standard/Standard1";
import Standard2 from "./layouts/standard/Standard2";
import Standard3 from "./layouts/standard/Standard3";
import Standard4 from "./layouts/standard/Standard4";
import { fetchSchedule } from "./modules/schedules/ScheduleActions";
import SyncSocketManager from "./modules/sync/SyncSocketManager";
import SVGLibrary from "./uikit/svg/SVGLibrary";

export default function App() {
  React.useEffect(() => {
    SyncSocketManager.init();
    return () => {
      SyncSocketManager.stop();
    };
  }, []);

  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    (async function () {
      const { scheduleId } = await APIClient.fetchInit();
      dispatch(fetchSchedule(scheduleId));
    })();
  }, []);

  return (
    <BrowserRouter>
      <SVGLibrary />
      <RouterRoutes>
        <Route path={Routes.STANDARD_1} element={<Standard1 />} />
        <Route path={Routes.STANDARD_2} element={<Standard2 />} />
        <Route path={Routes.STANDARD_3} element={<Standard3 />} />
        <Route path={Routes.STANDARD_4} element={<Standard4 />} />

        <Route path={Routes.HD_1} element={<HD1 />} />
        <Route path={Routes.HD_2} element={<HD2 />} />

        <Route path={Routes.GBA_1} element={<GBA1 />} />
        <Route path={Routes.DS_1} element={<DS1 />} />

        <Route path={Routes.FIVEFOUR_1} element={<FiveFour1 />} />

        <Route path={Routes.STANDARD_BINGO_1V1} element={<BingoStandard1v1 />} />
        <Route path={Routes.STANDARD_BINGO_2V2} element={<BingoStandard2v2 />} />

        <Route path={Routes.BREAK_LEFT} element={<BreakLeft />} />
        <Route path={Routes.BREAK_RIGHT} element={<BreakRight />} />
        <Route path={Routes.BREAK_COUNTDOWN} element={<BreakCountdown />} />
        <Route path={Routes.BREAK_OUTRO} element={<BreakOutro />} />

        <Route path={Routes.INTERVIEW} element={<InterviewOpen />} />
        <Route path={Routes.QUIZ_CORNER} element={<QuizCorner />} />

        <Route path={Routes.OMNIBAR} element={<OmnibarOnly />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}
