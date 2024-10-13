import { Request, Response } from "express";
import { StartSessionUseCase } from "../../../application/usecases/StartSessionUseCase";
import { EndSessionUseCase } from "../../../application/usecases/EndSessionUseCase";


export class SessionController {
    constructor(private startSessionUseCase: StartSessionUseCase, private endSessionUseCase: EndSessionUseCase) {}
    
    async startSession(req: Request, res: Response): Promise<void> {
        try {
        const { queueId, userId } = req.body;
        await this.startSessionUseCase.execute(queueId, userId);
        res.status(200).json({ message: 'Sessão iniciada com sucesso.' });
        } catch (error: any) {
        res.status(400).json({ error: error.message });
        }
    }

    async endSession(req: Request, res: Response): Promise<void> {
        try {
            // usar query params ou path variable aqui?
        const { queueId } = req.body;
        await this.endSessionUseCase.execute(queueId);
        res.status(200).json({ message: 'Sessão encerrada com sucesso.' });
        } catch (error: any) {
        res.status(400).json({ error: error.message });
        }
    }
}