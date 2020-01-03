const express = require('express');

const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

// only admin / self
// get a single user
usersRouter.get('/:id', usersController.getUser);

// only admin
// list all users
usersRouter.get('/', usersController.listUsers);

// only admin / self
// patch props of an user
usersRouter.patch('/:id', usersController.patchUser);

// only admin / self
// get permissions of a user
usersRouter.get('/:id/permissions', usersController.getPermissions);

// only admin / self
// patch permissions of a user
usersRouter.patch('/:id/permissions', usersController.patchPermissions);

// only admin / self
// deletes user an all his information
usersRouter.delete(':id', usersController.deleteUser);

module.exports = usersRouter;
