const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const { user, token } = require('./../schemas');

const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.post('/sign_up', validator.body(user.signUp), authController.signUp);
authRouter.post('/sign_in', validator.body(user.signIn), authController.signIn);
authRouter.post(
  '/refresh',
  validator.headers(token.refresh),
  authController.refresh
);

module.exports = authRouter;
