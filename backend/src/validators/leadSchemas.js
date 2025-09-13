import Joi from 'joi';

export const createLeadSchema = { body: Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('New','Contacted','Converted','Lost').default('New'),
  value: Joi.number().min(0).default(0)
})};

export const updateLeadSchema = { body: Joi.object({
  title: Joi.string(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('New','Contacted','Converted','Lost'),
  value: Joi.number().min(0)
})};
