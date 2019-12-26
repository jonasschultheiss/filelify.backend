const express = require('express');

const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.get('/sign_up', authController.signUp);
authRouter.get('/sign_in', authController.signIn);

module.exports = authRouter;