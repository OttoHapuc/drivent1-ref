import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-services';
import { AuthenticatedRequest } from '@/middlewares';

export async function insertUserNewTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  try {
    const insert = await ticketsService.insertUserTicket(req.userId, ticketTypeId);
    res.status(httpStatus.CREATED).send(insert);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const userTicket = await ticketsService.getUserTicket(userId);
    res.send(userTicket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function getAllTicketsTypes(req: Request, res: Response, next: NextFunction) {
  try {
    const tickets = await ticketsService.getAllTicketsTypes();
    res.send(tickets);
  } catch (error) {
    next(error);
  }
}
