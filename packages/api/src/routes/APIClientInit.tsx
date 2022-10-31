import { APIClientSubject } from "../APIClientTypes";
import { AdminInitPayload, InitPayload } from "../APITypes";
import Endpoints from "../Endpoints";

interface UpdatableInitPayload {
  scheduleId: string;
}

export class APIClientInit extends APIClientSubject {
  async fetchInit() {
    return await this.http.get<InitPayload>(Endpoints.INIT);
  }

  async fetchAdminInit() {
    return await this.http.get<AdminInitPayload>(Endpoints.INIT_ADMIN);
  }

  async updateInit(payload: UpdatableInitPayload) {
    return await this.http.post<UpdatableInitPayload>(Endpoints.INIT, payload);
  }
}
