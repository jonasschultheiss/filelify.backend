const express = require('express');
const routes = express.Router();
const miscRouter = require('./miscRouter');

routes.use('/', miscRouter);

module.exports = routes;
