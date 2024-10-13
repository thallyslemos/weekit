import { ProcessTicketUseCase } from '../../../src/application/usecases/ProcessTicketUseCase';
import { ITicketRepository } from '../../../src/domain/interfaces/ITicketRepository';
import { Ticket } from '../../../src/domain/entities/Ticket';

describe('ProcessTicketUseCase', () => {
    let processTicketUseCase: ProcessTicketUseCase;
    let mockTicketRepository: jest.Mocked<ITicketRepository>;

    beforeEach(() => {
        mockTicketRepository = {
            findById: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
        };
        processTicketUseCase = new ProcessTicketUseCase(mockTicketRepository);
    });

    it('deve processar um ticket com sucesso', async () => {
        const ticket = new Ticket('1', 'Ticket de Teste', 'Descrição', 'PENDING');
        mockTicketRepository.findById.mockResolvedValue(ticket);

        await processTicketUseCase.execute('1', 'APPROVED');

        expect(mockTicketRepository.findById).toHaveBeenCalledWith('1');
        expect(mockTicketRepository.save).toHaveBeenCalledWith(expect.any(Ticket));
        expect(ticket.status).toBe('APPROVED');
    });

    it('deve lançar um erro quando o ticket não for encontrado', async () => {
        mockTicketRepository.findById.mockResolvedValue(null);

        await expect(processTicketUseCase.execute('1', 'APPROVED')).rejects.toThrow('Ticket não encontrado');
    });

    it('deve lançar um erro para status inválido', async () => {
        const ticket = new Ticket('1', 'Ticket de Teste', 'Descrição', 'PENDING');
        mockTicketRepository.findById.mockResolvedValue(ticket);

        await expect(processTicketUseCase.execute('1', 'STATUS_INVÁLIDO' as any)).rejects.toThrow('Status inválido');
    });
});