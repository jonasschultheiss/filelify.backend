const helmet = require('helmet');
const jsonParser = require('body-parser').json();

const validationErrorHandler = require('./validationErrorHandler');

const middleware = [];

middleware.push(helmet());
middleware.push(jsonParser);

middleware.push(validationErrorHandler);

module.exports = middleware;
