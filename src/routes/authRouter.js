const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const { user } = require('./../schemas');
// const { validationErrorHandler } = require('../middleware');

const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.get('/sign_up', validator.body(user.signUp), authController.signUp);
authRouter.get('/sign_in', validator.body(user.signIn), authController.signIn);

module.exports = authRouter;
