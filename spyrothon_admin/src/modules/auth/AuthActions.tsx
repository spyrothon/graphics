import Cookies from "js-cookie";
import { UserWithPassword } from "@spyrothon/api";

import API from "@admin/API";
import { SafeDispatch } from "@admin/hooks/useDispatch";

import { AuthAction, AuthActionType } from "./AuthTypes";

const AUTH_COOKIE_ID = "session";

export function login(userName: string, password: string) {
  return async (dispatch: SafeDispatch) => {
    const { token } = await API.auth.login(userName, password);

    Cookies.set(AUTH_COOKIE_ID, btoa(JSON.stringify(token)), { sameSite: "strict" });
    dispatch(loadSession());
  };
}

export function logout(): AuthAction {
  Cookies.remove(AUTH_COOKIE_ID);
  return {
    type: AuthActionType.AUTH_LOGOUT,
  };
}

export function updateMe(user: UserWithPassword) {
  return async (dispatch: SafeDispatch) => {
    const updatedMe = await API.auth.updateMe(user);
    dispatch({ type: AuthActionType.AUTH_UPDATE_ME, user: updatedMe });
  };
}

export function loadSession() {
  return async (dispatch: SafeDispatch) => {
    const cookie = Cookies.get(AUTH_COOKIE_ID);
    if (cookie == null) return;

    const { token } = JSON.parse(atob(cookie));
    API.setAuthToken(token);
    const user = await API.auth.fetchMe();

    dispatch({
      type: AuthActionType.AUTH_LOGIN,
      token,
      user,
    });
  };
}
