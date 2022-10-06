import { APIClientSubject } from "../APIClientTypes";
import { InitialInterview, Interview } from "../APITypes";
import Endpoints from "../Endpoints";

export class APIClientInterviews extends APIClientSubject {
  async fetchInterviews() {
    return await this.http.get<Interview[]>(Endpoints.INTERVIEWS);
  }

  async fetchInterview(interviewId: string) {
    return await this.http.get<Interview>(Endpoints.INTERVIEW(interviewId));
  }

  async createInterview(interview: InitialInterview) {
    return await this.http.post<Interview>(Endpoints.INTERVIEWS, interview);
  }

  async updateInterview(interviewId: string, interview: Partial<Interview>) {
    return await this.http.put<Interview>(Endpoints.INTERVIEW(interviewId), interview);
  }

  async deleteInterview(interviewId: string) {
    return await this.http.delete(Endpoints.INTERVIEW(interviewId));
  }
}
