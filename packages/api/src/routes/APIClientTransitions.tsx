import { APIClientSubject } from "../APIClientTypes";
import { ScheduleResponse, TransitionSet } from "../APITypes";
import Endpoints from "../Endpoints";

export class APIClientTransitions extends APIClientSubject {
  async getTransitionSet(setId: string) {
    return await this.http.get<TransitionSet>(Endpoints.TRANSITION_SET(setId));
  }

  async updateTransitionSet(setId: string, changes: Partial<TransitionSet>) {
    return await this.http.put<TransitionSet>(Endpoints.TRANSITION_SET(setId), changes);
  }

  async resetTransitionSet(setId: string) {
    return await this.http.post<ScheduleResponse>(Endpoints.TRANSITION_SET_RESET(setId), {});
  }
}
