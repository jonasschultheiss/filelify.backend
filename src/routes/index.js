const express = require('express');

const miscRouter = require('./miscRouter');
const authRouter = require('./authRouter');
const usersRouter = require('./usersRouter');
const permissionsRouter = require('./permissionsRouter');
const fileRouter = require('./fileRouter');

const routes = express.Router();

routes.use('/', miscRouter);
routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/users', fileRouter);
routes.use('/permissions', permissionsRouter);

module.exports = routes;
