import { Queue } from '../entities/Queue';

export interface IQueueRepository {
  findById(id: string): Promise<Queue | null>;
  save(queue: Queue): Promise<void>;
  findAll(): Promise<Queue[]>;
}