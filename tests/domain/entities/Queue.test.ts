import { Queue } from '../../../src/domain/entities/Queue';
import { Ticket } from '../../../src/domain/entities/Ticket';

describe('Queue', () => {
  it('deve criar uma fila com propriedades corretas', () => {
    const tickets = [new Ticket('1', 'Test Ticket', 'Description', 'PENDING')];
    const queue = new Queue('1', tickets);
    expect(queue.id).toBe('1');
    expect(queue.tickets).toEqual(tickets);
    expect(queue.locked).toBe(false);
  });

  it('deve bloquear a fila', () => {
    const queue = new Queue('1', []);
    queue.lock();
    expect(queue.locked).toBe(true);
  });

  it('deve lançar um erro ao bloquear uma fila já bloqueada', () => {
    const queue = new Queue('1', []);
    queue.lock();
    expect(() => queue.lock()).toThrow('Queue is already locked');
  });

  it('deve desbloquear a fila', () => {
    const queue = new Queue('1', []);
    queue.lock();
    queue.unlock();
    expect(queue.locked).toBe(false);
  });
});