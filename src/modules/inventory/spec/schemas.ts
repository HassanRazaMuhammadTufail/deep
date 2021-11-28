import Joi from 'joi';

export const paramSchema = Joi.object()
  .keys({
    item: Joi.string().required(),
  })
  .options({ allowUnknown: false });

export const addBodySchema = Joi.object()
  .keys({
    quantity: Joi.number().required(),
    expiry: Joi.number().required(),
  })
  .options({ allowUnknown: false });

export const sellBodySchema = Joi.object()
  .keys({
    quantity: Joi.number().required(),
  })
  .options({ allowUnknown: false });
