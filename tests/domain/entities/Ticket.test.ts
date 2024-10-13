import { Ticket } from '../../../src/domain/entities/Ticket';

describe('Ticket', () => {
    it('deve criar um ticket com as propriedades corretas', () => {
        const ticket = new Ticket('1', 'Test Ticket', 'Description', 'PENDING');
        expect(ticket.id).toBe('1');
        expect(ticket.title).toBe('Test Ticket');
        expect(ticket.description).toBe('Description');
        expect(ticket.status).toBe('PENDING');
    });
});