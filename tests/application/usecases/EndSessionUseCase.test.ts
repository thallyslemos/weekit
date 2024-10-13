import { IQueueRepository } from '../../../src/domain/interfaces/IQueueRepository';
import { ISessionService } from '../../../src/domain/interfaces/ISessionService';
import { EndSessionUseCase } from '../../../src/application/usecases/EndSessionUseCase';
import { Queue } from '../../../src/domain/entities/Queue';

describe('EndSessionUseCase', () => {
    let endSessionUseCase: EndSessionUseCase;
    let mockQueueRepository: jest.Mocked<IQueueRepository>;
    let mockSessionService: jest.Mocked<ISessionService>;

    beforeEach(() => {
        mockQueueRepository = {
            findById: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
        };
        mockSessionService = {
            startSession: jest.fn(),
            endSession: jest.fn(),
            isQueueInUse: jest.fn(),
        };
        endSessionUseCase = new EndSessionUseCase(mockQueueRepository, mockSessionService);
    });

    it('deve encerrar uma sessão para uma fila bloqueada', async () => {
        const queue = new Queue('1', []);
        queue.lock();
        mockQueueRepository.findById.mockResolvedValue(queue);

        await endSessionUseCase.execute('1');

        expect(mockQueueRepository.findById).toHaveBeenCalledWith('1');
        expect(mockQueueRepository.save).toHaveBeenCalledWith(expect.any(Queue));
        expect(mockSessionService.endSession).toHaveBeenCalledWith('1');
        expect(queue.locked).toBe(false);
    });

    it('deve lançar um erro quando a fila não for encontrada', async () => {
        mockQueueRepository.findById.mockResolvedValue(null);

        await expect(endSessionUseCase.execute('1')).rejects.toThrow('Fila não encontrada.');
    });

    it('deve lançar um erro quando a fila não estiver bloqueada', async () => {
        const queue = new Queue('1', []);
        mockQueueRepository.findById.mockResolvedValue(queue);

        await expect(endSessionUseCase.execute('1')).rejects.toThrow('Fila não está em uso.');
    });
});