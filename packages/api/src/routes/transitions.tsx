import type { ScheduleResponse } from "../APITypes";
import Endpoints from "../Endpoints";
import HTTPUtils from "../HTTPUtils";

export async function resetTransitionSet(setId: string) {
  return await HTTPUtils.post<ScheduleResponse>(Endpoints.TRANSITION_SET_RESET(setId), {});
}
