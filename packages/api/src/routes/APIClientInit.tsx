import { APIClientSubject } from "../APIClientTypes";
import { InitPayload } from "../APITypes";
import Endpoints from "../Endpoints";

interface UpdatableInitPayload {
  scheduleId: string;
}

export class APIClientInit extends APIClientSubject {
  async fetchInit() {
    return await this.http.get<InitPayload>(Endpoints.INIT);
  }

  async updateInit(payload: UpdatableInitPayload) {
    return await this.http.post<UpdatableInitPayload>(Endpoints.INIT, payload);
  }
}
