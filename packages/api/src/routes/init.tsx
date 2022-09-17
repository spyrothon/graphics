import type { InitPayload } from "../APITypes";
import Endpoints from "../Endpoints";
import HTTPUtils from "../HTTPUtils";

export async function fetchInit() {
  return await HTTPUtils.get<InitPayload>(Endpoints.INIT);
}

interface UpdatableInitPayload {
  scheduleId: string;
}

export async function updateInit(payload: UpdatableInitPayload) {
  return await HTTPUtils.post<UpdatableInitPayload>(Endpoints.INIT, payload);
}
