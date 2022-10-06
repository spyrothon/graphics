import type { HTTPUtil } from "./HTTPUtil";

export interface APIClientConfig {
  authToken?: string;
  baseUrl: string;
  apiVersion: string;
}

export class APIClientSubject {
  constructor(protected http: HTTPUtil, private config: APIClientConfig) {}
}
