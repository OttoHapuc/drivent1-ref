import { notFoundError, unauthorizedError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import { createPayment } from '@/protocols';
import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repositoriy';

async function getPaymentInfo(ticketId: number, userId: number) {
  if (!ticketId) throw badRequestError();
  const ticket = await ticketsRepository.findTicket(ticketId);
  if (!ticket) throw notFoundError();
  const enrollmentTicket = await ticketsRepository.findUserTicket(userId);
  if (!enrollmentTicket || enrollmentTicket.id !== ticketId) throw unauthorizedError();
  const payment = await paymentsRepository.getPayment(ticketId);
  return payment;
}

async function payTicket(paymentTicket: createPayment, userId: number) {
  const ticket = await ticketsRepository.findTicket(paymentTicket.ticketId);
  if (!ticket) throw notFoundError();
  const enrollmentTicket = await ticketsRepository.findUserTicket(userId);
  if (!enrollmentTicket || enrollmentTicket.id !== paymentTicket.ticketId) throw unauthorizedError();
  await paymentsRepository.insertTicketPayment(paymentTicket);
  await ticketsRepository.updateTicketPaymentStatus(paymentTicket.ticketId);
  const payment = await paymentsRepository.getPayment(paymentTicket.ticketId);
  return payment;
}

export default {
  getPaymentInfo,
  payTicket,
};
