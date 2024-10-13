export interface ISessionService {
    startSession(queueId: string, userId: string): void;
    endSession(queueId: string): void;
    isQueueInUse(queueId: string): boolean;
  }