const express = require('express');

const routes = express.Router();
const miscRouter = require('./miscRouter');
const authRouter = require('./authRouter');

routes.use('/', miscRouter);
routes.use('/auth', authRouter);

module.exports = routes;