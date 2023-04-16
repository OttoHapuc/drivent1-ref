import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsServices from '@/services/tickets-services';

export async function getTicketsController(req: Request, res: Response, next: NextFunction) {
  const userId = res.locals.userId;
  try {
    const ticketsUser = await ticketsServices.getTickets(userId);
    return res.send(ticketsUser);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
export async function getTicketsTypesController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await ticketsServices.getTicketsTypes();
    return res.send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
export async function postTicketsController(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
