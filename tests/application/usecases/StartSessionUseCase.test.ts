import { StartSessionUseCase } from '../../../src/application/usecases/StartSessionUseCase';
import { IQueueRepository } from '../../../src/domain/interfaces/IQueueRepository';
import { ISessionService } from '../../../src/domain/interfaces/ISessionService';
import { Queue } from '../../../src/domain/entities/Queue';

describe('StartSessionUseCase', () => {
  let startSessionUseCase: StartSessionUseCase;
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
    startSessionUseCase = new StartSessionUseCase(mockQueueRepository, mockSessionService);
  });

  it('deve iniciar uma sessão para uma fila desbloqueada', async () => {
    const queue = new Queue('1', []);
    mockQueueRepository.findById.mockResolvedValue(queue);

    await startSessionUseCase.execute('1', 'user1');

    expect(mockQueueRepository.findById).toHaveBeenCalledWith('1');
    expect(mockQueueRepository.save).toHaveBeenCalledWith(expect.any(Queue));
    expect(mockSessionService.startSession).toHaveBeenCalledWith('1', 'user1');
    expect(queue.locked).toBe(true);
  });

  it('deve lançar um erro quando a fila não for encontrada', async () => {
    mockQueueRepository.findById.mockResolvedValue(null);

    await expect(startSessionUseCase.execute('1', 'user1')).rejects.toThrow('Filha não encontrada.');
  });

  it('deve lançar um erro quando a fila já estiver bloqueada', async () => {
    const queue = new Queue('1', []);
    queue.lock();
    mockQueueRepository.findById.mockResolvedValue(queue);

    await expect(startSessionUseCase.execute('1', 'user1')).rejects.toThrow('Fila já está em uso.');
  });
});