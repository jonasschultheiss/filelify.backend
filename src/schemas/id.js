const Joi = require('@hapi/joi');

const number = Joi.number().min(1);

const id = Joi.object({
  id: number.required()
});

module.exports = id;
