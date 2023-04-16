import { Router } from 'express';

const paymentRouter = Router();

paymentRouter.get('/');
paymentRouter.post('/payment/process');

export { paymentRouter };
