import { IQueueRepository } from "../../domain/interfaces/IQueueRepository";
import { ISessionService } from "../../domain/interfaces/ISessionService";


export class EndSessionUseCase {
    constructor(
      private queueRepository: IQueueRepository,
      private sessionService: ISessionService
    ) {}
  
    async execute(queueId: string): Promise<void> {
      const queue = await this.queueRepository.findById(queueId);
  
      if (!queue) {
        throw new Error('Fila não encontrada.');
      }
  
      if (!this.sessionService.isQueueInUse(queueId)) {
        throw new Error('Fila não está em uso.');
      }
  
      this.sessionService.endSession(queueId);
    }
  }