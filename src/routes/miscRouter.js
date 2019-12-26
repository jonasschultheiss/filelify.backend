const express = require('express');

const miscRouter = express.Router();
const miscController = require('../controllers/miscController');

miscRouter.get('/ping', miscController.ping);
miscRouter.get('/test', miscController.test);

module.exports = miscRouter;