import { ISessionService } from '../../domain/interfaces/ISessionService';

export class SessionService implements ISessionService {
  private activeSessions: Map<string, string> = new Map();

  startSession(queueId: string, userId: string): void {
    console.log("startSession");
        console.log(queueId);
        console.log(this.activeSessions);
    if (this.activeSessions.has(queueId)) {
      throw new Error('Fila já está em uso.');
    }
    this.activeSessions.set(queueId, userId);
  }

  endSession(queueId: string): void {
    console.log("endSession");
    console.log(queueId);
    console.log(this.activeSessions);
    this.activeSessions.delete(queueId);
  }

  isQueueInUse(queueId: string): boolean {
    console.log("isQueueInUse");
    console.log(queueId);
    console.log(this.activeSessions);
    return this.activeSessions.has(queueId);
  }
}