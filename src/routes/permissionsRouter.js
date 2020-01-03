const express = require('express');

const permissionsRouter = express.Router();
const permissionsController = require('../controllers/permissionsController');

// only admin
// list all permissions
permissionsRouter.get('/', permissionsController.listPermissions);

// get specific permission
permissionsRouter.get('/?', permissionsController.getPermission);

module.exports = permissionsRouter;
