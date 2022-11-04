import { TransitionSet } from "@spyrothon/api";

import API from "@admin/API";

export async function updateTransitionSet(id: string, transitionSet: Partial<TransitionSet>) {
  // The result of this change comes through over the socket to `load_schedule`.
  return await API.transitions.updateTransitionSet(id, transitionSet);
}
