const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const usersRouter = express.Router();
const usersController = require('../controllers/usersController');
const makeSecureRoute = require('../middleware/makeSecureRoute');
const jwtVerify = require('../middleware/jwtVerify');
const { id, token } = require('./../schemas');

// only admin / self
// get a single user
usersRouter.get(
  '/:id',
  validator.body(token.refresh),
  validator.params(id),
  jwtVerify,
  makeSecureRoute(false),
  usersController.getUser
);

// only admin
// list all users
usersRouter.get(
  '/',
  jwtVerify,
  makeSecureRoute(true),
  usersController.listUsers
);

// only admin / self
// patch props of an user
usersRouter.patch('/:id', usersController.patchUser);

// only admin / self
// get permissions of a user
usersRouter.get('/:id/permissions', usersController.getPermissions);

// only admin / self
// patch permissions of a user
// usersRouter.patch('/:id/permissions', usersController.patchPermissions);

// only admin / self
// deletes user an all his information
usersRouter.delete(':id', usersController.deleteUser);

module.exports = usersRouter;
