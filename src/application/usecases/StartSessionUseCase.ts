import { IQueueRepository } from '../../domain/interfaces/IQueueRepository';
import { ISessionService } from '../../domain/interfaces/ISessionService';

export class StartSessionUseCase {
  constructor(
    private queueRepository: IQueueRepository,
    private sessionService: ISessionService
  ) {}

  async execute(queueId: string, userId: string): Promise<void> {
    // console.log(this.queueRepository.findAll());
    // console.log(this.queueRepository.findById(queueId));
    // console.log(queueId);
    const queue = await this.queueRepository.findById(queueId);
    if (!queue) {
      throw new Error('Fila não encontrada.');
    }

    if (queue.locked) {
      throw new Error('Fila já está em uso.');
    }

    queue.lock();
    await this.queueRepository.save(queue);
    this.sessionService.startSession(queueId, userId);
  }
}