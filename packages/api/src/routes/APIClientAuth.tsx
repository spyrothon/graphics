import { APIClientSubject } from "../APIClientTypes";
import type { SessionToken, User } from "../APITypes";
import Endpoints from "../Endpoints";

interface LoginResponse {
  user: User;
  token: SessionToken;
}

interface UserWithPassword extends User {
  password: string;
}

export class APIClientAuth extends APIClientSubject {
  async fetchMe() {
    return await this.http.get<User>(Endpoints.AUTH_ME);
  }

  async updateMe(user: UserWithPassword) {
    return await this.http.put<User>(Endpoints.AUTH_ME, user);
  }

  async login(name: string, password: string) {
    return await this.http.post<LoginResponse>(Endpoints.AUTH_LOGIN, { name, password });
  }

  async logout() {
    return await this.http.delete(Endpoints.AUTH_LOGOUT);
  }
}
