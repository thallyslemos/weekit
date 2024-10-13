import express from 'express';
import { setupRoutes } from './web/routes';
import { StartSessionUseCase } from '../application/usecases/StartSessionUseCase';
import { InMemoryQueueRepository } from './repositories/InMemoryQueueRepository';
import { SessionService } from '../application/services/SessionService';
import { SessionController } from './web/controller/SessionController';
import { EndSessionUseCase } from '../application/usecases/EndSessionUseCase';
import { Queue } from '../domain/entities/Queue';

const app = express();
app.use(express.json());

const initialQueues: Queue[] = [
 new Queue('1', [
    { id: '1', description: 'Computador sem rede no H408', status: 'PENDING', title: 'Computador sem internet' },
    { id: '2', description: 'Projetor não funciona na sala H409', status: 'PENDING', title: 'Projetor não funciona' },
 ]),
  new Queue('2', [
      { id: '3', description: 'Computador não liga no laboratorio H401', status: 'PENDING', title: 'Computador não liga' },
      { id: '4', description: 'Monitor não liga na primeira fileira do laboratorio 408', status: 'PENDING', title: 'Monitor queimado' },
  ]),
]

const queueRepository = new InMemoryQueueRepository();
initialQueues.forEach(queue => queueRepository.save(queue));
const sessionService = new SessionService();
const startSessionUseCase = new StartSessionUseCase(queueRepository, sessionService);
const endSessionUseCase = new EndSessionUseCase(queueRepository, sessionService);
const sessionController = new SessionController(startSessionUseCase, endSessionUseCase);

app.use('/api', setupRoutes(sessionController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});