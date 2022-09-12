import HTTPUtils from "../HTTPUtils";
import Endpoints from "../Endpoints";

import type { ScheduleResponse } from "../APITypes";

export async function resetTransitionSet(setId: string) {
  return await HTTPUtils.post<ScheduleResponse>(Endpoints.TRANSITION_SET_RESET(setId), {});
}
