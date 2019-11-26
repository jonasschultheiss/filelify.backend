const express = require('express');
const miscRouter = express.Router();
const miscController = require('../controllers/miscController');

miscRouter.get('/ping', miscController.ping);

module.exports = miscRouter;
