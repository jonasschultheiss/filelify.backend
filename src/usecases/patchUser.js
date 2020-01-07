const argon2 = require('argon2');

const db = require('../db');
const { logger, logLevels } = require('../commons/logging');

const patchUser = async (params, body) => {
  try {
    const { password } = body;
    const hashedPassword = await argon2.hash(password);
    await db.users.patchPassword(params.id, hashedPassword);
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception at signUp:signUp',
      err
    });

    throw err;
  }
};

module.exports = patchUser;
