import { Ticket } from '../../domain/entities/Ticket';
import { ITicketRepository } from '../../domain/interfaces/ITicketRepository';

export class InMemoryTicketRepository implements ITicketRepository {
  private tickets: Ticket[] = [];

  async findById(id: string): Promise<Ticket | null> {
    return this.tickets.find(ticket => ticket.id === id) || null;
  }

  async save(ticket: Ticket): Promise<void> {
    const index = this.tickets.findIndex(t => t.id === ticket.id);
    if (index !== -1) {
      this.tickets[index] = ticket;
    } else {
      this.tickets.push(ticket);
    }
  }

  async findAll(): Promise<Ticket[]> {
    return [...this.tickets];
  }
}