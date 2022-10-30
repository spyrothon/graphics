import { APIClientAuth } from "./routes/APIClientAuth";
import { APIClientInit } from "./routes/APIClientInit";
import { APIClientInterviews } from "./routes/APIClientInterviews";
import { APIClientParticipants } from "./routes/APIClientParticipants";
import { APIClientPublishing } from "./routes/APIClientPublishing";
import { APIClientRuns } from "./routes/APIClientRuns";
import { APIClientSchedules } from "./routes/APIClientSchedules";
import { APIClientTransitions } from "./routes/APIClientTransitions";
import { APIClientConfig } from "./APIClientTypes";
import { HTTPUtil } from "./HTTPUtil";

export class APIClient {
  http: HTTPUtil;
  auth: APIClientAuth;
  init: APIClientInit;
  interviews: APIClientInterviews;
  participants: APIClientParticipants;
  publishing: APIClientPublishing;
  runs: APIClientRuns;
  schedules: APIClientSchedules;
  transitions: APIClientTransitions;

  #endpoint: string;

  constructor(public config: APIClientConfig) {
    this.#endpoint = `${config.baseUrl}/${config.apiVersion}`;

    this.http = new HTTPUtil(this.#endpoint, config.authToken);
    this.auth = new APIClientAuth(this.http, config);
    this.init = new APIClientInit(this.http, config);
    this.interviews = new APIClientInterviews(this.http, config);
    this.participants = new APIClientParticipants(this.http, config);
    this.publishing = new APIClientPublishing(this.http, config);
    this.runs = new APIClientRuns(this.http, config);
    this.schedules = new APIClientSchedules(this.http, config);
    this.transitions = new APIClientTransitions(this.http, config);
  }

  setAuthToken(authToken: string) {
    this.config.authToken = authToken;
    this.http.setAuthToken(authToken);
  }
}
