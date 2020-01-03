const express = require('express');

const miscRouter = require('./miscRouter');
const authRouter = require('./authRouter');
const usersRouter = require('./usersRouter');
const permissionsRouter = require('./permissionsRouter');

const routes = express.Router();

routes.use('/', miscRouter);
routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/permissions', permissionsRouter);

module.exports = routes;
