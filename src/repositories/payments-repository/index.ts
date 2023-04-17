import { prisma } from '@/config';
import { createPayment } from '@/protocols';

function getPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function insertTicketPayment(paymentData: createPayment) {
  const lenght = paymentData.cardData.number.toString().length;
  const lastDigits = paymentData.cardData.number.toString().substring(lenght - 4, lenght);
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: paymentData.ticketId,
    },
  });
  const tycketType = await prisma.ticketType.findUnique({
    where: {
      id: ticket.ticketTypeId,
    },
  });
  return prisma.payment.create({
    data: {
      ticketId: paymentData.ticketId,
      value: tycketType.price,
      cardLastDigits: lastDigits,
      cardIssuer: paymentData.cardData.issuer,
    },
  });
}

const paymentsRepository = {
  getPayment,
  insertTicketPayment,
};
export default paymentsRepository;
