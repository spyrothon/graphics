import * as React from "react";
import { Schedule } from "@spyrothon/api";

interface ScheduleContextState {
  scheduleId: string;
  schedule: Schedule;
}

// undefined! is fine here because the value gets set in `App` (the root of the application).
const CurrentScheduleContext = React.createContext<ScheduleContextState>(undefined!);
export default CurrentScheduleContext;
