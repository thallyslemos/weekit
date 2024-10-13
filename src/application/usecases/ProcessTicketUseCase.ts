import { Ticket } from '../../domain/entities/Ticket';
import { ITicketRepository } from '../../domain/interfaces/ITicketRepository';

export class ProcessTicketUseCase {
  constructor(private ticketRepository: ITicketRepository) {}

  async execute(ticketId: string, status: 'APPROVED' | 'REJECTED'): Promise<Ticket> {
    const ticket = await this.ticketRepository.findById(ticketId);
    if (!ticket) {
      throw new Error('Ticket não encontrado.');
    }

    if (status !== 'APPROVED' && status !== 'REJECTED') {
      throw new Error('Status inválido.');
    }

    ticket.status = status;
    await this.ticketRepository.save(ticket);
    return ticket;
  }
}