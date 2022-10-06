import { APIClientSubject } from "../APIClientTypes";
import type { ScheduleResponse } from "../APITypes";
import Endpoints from "../Endpoints";

export class APIClientTransitions extends APIClientSubject {
  async resetTransitionSet(setId: string) {
    return await this.http.post<ScheduleResponse>(Endpoints.TRANSITION_SET_RESET(setId), {});
  }
}
