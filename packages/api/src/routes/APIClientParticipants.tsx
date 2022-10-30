import { APIClientSubject } from "../APIClientTypes";
import type { InitialParticipant, Participant } from "../APITypes";
import Endpoints from "../Endpoints";

export class APIClientParticipants extends APIClientSubject {
  async fetchParticipants() {
    return await this.http.get<Participant[]>(Endpoints.PARTICIPANTS);
  }

  async fetchParticipant(participantId: string) {
    return await this.http.get<Participant>(Endpoints.PARTICIPANT(participantId));
  }

  async createParticipant(data: InitialParticipant) {
    return await this.http.post<Participant>(Endpoints.PARTICIPANTS, data);
  }

  async updateParticipant(participantId: string, data: Partial<Participant>) {
    return await this.http.put<Participant>(Endpoints.PARTICIPANT(participantId), data);
  }

  async deleteParticipant(participantId: string) {
    return await this.http.delete(Endpoints.PARTICIPANT(participantId));
  }
}
