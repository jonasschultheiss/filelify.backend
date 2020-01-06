const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const db = require('../db');
const config = require('../commons/config');
const { logger, logLevels } = require('../commons/logging');

const patchUsername = async body => {
  try {
    const { token, username } = body;

    return token;
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception at signUp:signUp',
      err
    });

    throw err;
  }
};

module.exports = signUp;
