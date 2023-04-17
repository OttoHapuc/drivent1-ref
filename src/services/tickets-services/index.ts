import ticketsRepository from '@/repositories/tickets-repositoriy';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';

async function insertUserTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  await ticketsRepository.insertNewTicket(ticketTypeId, enrollment.id);
  const ticket = await ticketsRepository.findUserTicket(enrollment.userId);
  return ticket;
}

async function getUserTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  const userTicket = await ticketsRepository.findUserTicket(userId);
  if (!userTicket) throw notFoundError();
  return userTicket;
}

async function getAllTicketsTypes() {
  const ticketsTypes = await ticketsRepository.TicketsTypes();
  return ticketsTypes;
}

export default {
  insertUserTicket,
  getAllTicketsTypes,
  getUserTicket,
};
