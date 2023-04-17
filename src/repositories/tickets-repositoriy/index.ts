import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

function insertNewTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED,
    },
  });
}

function TicketsTypes() {
  return prisma.ticketType.findMany();
}

function findUserTicket(userId: number) {
  return prisma.ticket.findFirst({
    include: {
      TicketType: true,
    },
    where: {
      Enrollment: {
        userId,
      },
    },
  });
}

function updateTicketPaymentStatus(tickedId: number) {
  return prisma.ticket.update({
    data: {
      status: TicketStatus.PAID,
    },
    where: {
      id: tickedId,
    },
  });
}

function findTicket(tickedId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: tickedId,
    },
  });
}

const ticketsRepository = {
  insertNewTicket,
  TicketsTypes,
  findUserTicket,
  findTicket,
  updateTicketPaymentStatus,
};

export default ticketsRepository;
