import { APIClientSubject } from "../APIClientTypes";
import { InitialInterview, Interview, InterviewParticipant } from "../APITypes";
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

  async addInterviewer(runId: string, data: Partial<InterviewParticipant>) {
    return await this.http.post<Interview>(Endpoints.INTERVIEW_INTERVIEWERS(runId), data);
  }

  async updateInterviewer(
    runId: string,
    interviewerId: string,
    data: Partial<InterviewParticipant>,
  ) {
    return await this.http.put<Interview>(
      Endpoints.INTERVIEW_INTERVIEWER(runId, interviewerId),
      data,
    );
  }

  async removeInterviewer(runId: string, interviewerId: string) {
    return await this.http.delete(Endpoints.INTERVIEW_INTERVIEWER(runId, interviewerId));
  }

  async addInterviewee(runId: string, data: Partial<InterviewParticipant>) {
    return await this.http.post<Interview>(Endpoints.INTERVIEW_INTERVIEWEES(runId), data);
  }

  async updateInterviewee(
    runId: string,
    interviewerId: string,
    data: Partial<InterviewParticipant>,
  ) {
    return await this.http.put<Interview>(
      Endpoints.INTERVIEW_INTERVIEWEE(runId, interviewerId),
      data,
    );
  }

  async removeInterviewee(runId: string, interviewerId: string) {
    return await this.http.delete(Endpoints.INTERVIEW_INTERVIEWEE(runId, interviewerId));
  }
}
