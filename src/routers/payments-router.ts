import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketPaymentInfo, processTicketPayment } from '@/controllers/payments-controller';
import { ticketPaymentSchema } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getTicketPaymentInfo)
  .post('/process', validateBody(ticketPaymentSchema), processTicketPayment);

export { paymentsRouter };
