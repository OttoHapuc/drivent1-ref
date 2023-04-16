import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { notFoundError } from '@/errors';

async function getTicketsTypes() {
  //    retornar lista de typos de tickets
  //    const {rows: result} = ;
  return;
}
async function getTickets(userId: number) {
  //    validar user id se é existente 401
  //    verificar se o usuário tem cadastro/inscrição 404
  //    usuário sem ingresso 404

  //    retornar tiket do usuário
  //    const {rows: ticketsUser} = (userId);
  return; // ticketsUser
}

export default {
  getTicketsTypes,
  getTickets,
};
