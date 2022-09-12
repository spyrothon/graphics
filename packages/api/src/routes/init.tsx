import HTTPUtils from "../HTTPUtils";
import Endpoints from "../Endpoints";

import type { InitPayload } from "../APITypes";

export async function fetchInit() {
  return await HTTPUtils.get<InitPayload>(Endpoints.INIT);
}

interface UpdatableInitPayload {
  scheduleId: string;
}

export async function updateInit(payload: UpdatableInitPayload) {
  return await HTTPUtils.post<UpdatableInitPayload>(Endpoints.INIT, payload);
}
