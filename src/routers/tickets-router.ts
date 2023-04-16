import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.get('/types');
ticketsRouter.get('/');
ticketsRouter.post('/');

export { ticketsRouter };
