const Joi = require('@hapi/joi');

const token = Joi.string().min(1);

const refresh = Joi.object({
  token
});

module.exports = { refresh };
