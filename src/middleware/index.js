const helmet = require('helmet');

const validationErrorHandler = require('./validationErrorHandler');

const middleware = [];

middleware.push(helmet());
middleware.push(validationErrorHandler);

module.exports = middleware;
