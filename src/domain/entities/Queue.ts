import { Ticket } from './Ticket';

export class Queue {
  private isLocked: boolean = false;

  constructor(
    public id: string,
    public tickets: Ticket[]
  ) {}

  lock(): void {
    if (this.isLocked) throw new Error('Queue is already locked');
    this.isLocked = true;
  }

  unlock(): void {
    this.isLocked = false;
  }

  get locked(): boolean {
    return this.isLocked;
  }
}