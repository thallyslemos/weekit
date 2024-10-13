import { SessionService } from '../../../src/application/services/SessionService';

describe('SessionService', () => {
    let sessionService: SessionService;

    beforeEach(() => {
        sessionService = new SessionService();
    });

    it('deve iniciar uma sessão', () => {
        sessionService.startSession('queue1', 'user1');
        expect(sessionService.isQueueInUse('queue1')).toBe(true);
    });

    it('deve lançar um erro ao iniciar uma sessão para uma fila já em uso', () => {
        sessionService.startSession('queue1', 'user1');
        expect(() => sessionService.startSession('queue1', 'user2')).toThrow('Fila já está em uso.');
    });

    it('deve encerrar uma sessão', () => {
        sessionService.startSession('queue1', 'user1');
        sessionService.endSession('queue1');
        expect(sessionService.isQueueInUse('queue1')).toBe(false);
    });
});
