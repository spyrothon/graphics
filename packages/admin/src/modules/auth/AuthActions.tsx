import Cookies from "js-cookie";

import { APIClient, HTTPUtils, User } from "@spyrothon/api";
import { SafeDispatch } from "@admin/hooks/useDispatch";
import { AuthActionType, AuthAction } from "./AuthTypes";

const AUTH_COOKIE_ID = "session";

export function login(userName: string, password: string) {
  return async (dispatch: SafeDispatch) => {
    const { token } = await APIClient.login(userName, password);

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

export function updateMe(user: User, password: string) {
  return async (dispatch: SafeDispatch) => {
    const updatedMe = await APIClient.updateMe({ ...user, password });
    dispatch({ type: AuthActionType.AUTH_UPDATE_ME, user: updatedMe });
  };
}

export function loadSession() {
  return async (dispatch: SafeDispatch) => {
    const cookie = Cookies.get(AUTH_COOKIE_ID);
    if (cookie == null) return;

    const { token } = JSON.parse(atob(cookie));
    HTTPUtils.setAuth(token);
    const user = await APIClient.fetchMe();

    dispatch({
      type: AuthActionType.AUTH_LOGIN,
      token,
      user,
    });
  };
}
