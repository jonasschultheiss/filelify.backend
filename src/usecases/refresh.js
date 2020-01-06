const jwt = require('jsonwebtoken');

const config = require('../commons/config');
const { logger, logLevels } = require('../commons/logging');

const refresh = async header => {
  try {
    const { token } = header;
    if (!token) throw Error('Token not provided.');
    if (!jwt.verify(token, config.JWT_SECRET)) throw Error('Token not valid.');

    const { _id, username, email, profilePicturePath, permission } = jwt.decode(
      token
    );

    const newToken = await jwt.sign(
      {
        _id,
        username,
        email,
        profilePicturePath,
        permission
      },
      config.JWT_SECRET
    );

    return newToken;
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception at signIn:signIn',
      err
    });
    throw err;
  }
};

module.exports = refresh;
