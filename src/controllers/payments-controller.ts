import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payment-service';
import { createPayment } from '@/protocols';

export async function getTicketPaymentInfo(req: AuthenticatedRequest, res: Response) {
  const ticketId: number = parseInt(req.query.ticketId as string);
  try {
    const paymentInfo = await paymentsService.getPaymentInfo(ticketId, req.userId);
    res.send(paymentInfo);
  } catch (error) {
    if (error.name === 'NotFoundError') res.status(httpStatus.NOT_FOUND).send();
    if (error.name === 'BadRequestError') res.status(httpStatus.BAD_REQUEST).send();
    if (error.name === 'UnauthorizedError') res.status(httpStatus.UNAUTHORIZED).send();
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
}

export async function processTicketPayment(req: AuthenticatedRequest, res: Response) {
  const paymentTicket = req.body as createPayment;
  try {
    const payment = await paymentsService.payTicket(paymentTicket, req.userId);
    res.send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      console.log(error);
      res.status(httpStatus.NOT_FOUND).send();
    }
    if (error.name === 'BadRequestError') res.status(httpStatus.BAD_REQUEST).send();
    if (error.name === 'UnauthorizedError') res.status(httpStatus.UNAUTHORIZED).send();
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
}
