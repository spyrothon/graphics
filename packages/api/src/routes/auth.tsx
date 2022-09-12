import HTTPUtils from "../HTTPUtils";
import Endpoints from "../Endpoints";

import type { SessionToken, User } from "../APITypes";

interface LoginResponse {
  user: User;
  token: SessionToken;
}

interface UserWithPassword extends User {
  password: string;
}

export async function fetchMe() {
  return await HTTPUtils.get<User>(Endpoints.AUTH_ME);
}

export async function updateMe(user: UserWithPassword) {
  return await HTTPUtils.put<User>(Endpoints.AUTH_ME, user);
}

export async function login(name: string, password: string) {
  return await HTTPUtils.post<LoginResponse>(Endpoints.AUTH_LOGIN, { name, password });
}

export async function logout() {
  return await HTTPUtils.delete(Endpoints.AUTH_LOGOUT);
}
