import Joi from 'joi';

export const createCustomerSchema = { body: Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('', null),
  company: Joi.string().allow('', null)
})};

export const updateCustomerSchema = { body: Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().allow('', null),
  company: Joi.string().allow('', null)
})};
