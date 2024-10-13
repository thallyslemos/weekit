import { Ticket } from '../entities/Ticket';

export interface ITicketRepository {
  findById(id: string): Promise<Ticket | null>;
  save(ticket: Ticket): Promise<void>;
  findAll(): Promise<Ticket[]>;
}