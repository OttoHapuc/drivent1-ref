import Joi from 'joi';

export const ticketPaymentSchema = Joi.object({
  ticketId: Joi.number().positive().integer().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().positive().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().positive().required(),
  }).required(),
});
