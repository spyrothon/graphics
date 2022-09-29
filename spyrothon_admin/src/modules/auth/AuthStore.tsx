import { createSelector } from "reselect";

import { StoreState } from "../../Store";

const getAuthState = (state: StoreState) => state.auth;

export default {
  isLoggedIn: createSelector([getAuthState], (state) => state.authenticated),
  getToken: createSelector([getAuthState], (state) => state.token),
  getUser: createSelector([getAuthState], (state) => state.user),
};
