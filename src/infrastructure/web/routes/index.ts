import { Router } from 'express';
import { SessionController } from '../controller/SessionController';

export function setupRoutes(sessionController: SessionController): Router {
  const router = Router();

  router.post('/sessions/start', (req, res) => sessionController.startSession(req, res));
  router.post('/sessions/end', (req, res) => sessionController.endSession(req, res));
  

  return router;
}