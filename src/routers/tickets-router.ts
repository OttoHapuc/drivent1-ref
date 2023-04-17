import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getAllTicketsTypes, getUserTicket, insertUserNewTicket } from '@/controllers';
import { insertTicketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', getUserTicket)
  .post('/', validateBody(insertTicketSchema), insertUserNewTicket)
  .get('/types', getAllTicketsTypes);

export { ticketsRouter };
