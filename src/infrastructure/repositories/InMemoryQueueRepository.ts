import { Queue } from "../../domain/entities/Queue";
import { IQueueRepository } from "../../domain/interfaces/IQueueRepository";

export class InMemoryQueueRepository implements IQueueRepository {
  private queues: Queue[] = [];

  async findById(id: string): Promise<Queue | null> {
    console.log(this.queues);
    console.log(id);
    return this.queues.find((queue) => queue.id === id) || null;
  }

  async save(queue: Queue): Promise<void> {
    const index = this.queues.findIndex((q) => q.id === queue.id);
    if (index >= 0) {
      this.queues[index] = queue;
    } else {
      this.queues.push(queue);
    }
  }

  async findAll(): Promise<Queue[]> {
    return this.queues;
  }
}