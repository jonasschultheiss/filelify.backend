const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const db = require('../db');
const config = require('../commons/config');
const { logger, logLevels } = require('../commons/logging');

const signIn = async body => {
  try {
    const { username, password } = body;
    const user = await db.users.getUserByName(username);
    if (!user && !user.id && !user.hashed_password)
      throw Error('User not found.');

    const doPasswordsMatch = await argon2.verify(
      user.hashed_password,
      password
    );
    if (!doPasswordsMatch) throw Error('Password not correct.');

    const token = await jwt.sign(
      {
        _id: user.id,
        username: user.username,
        email: user.email,
        profilePicturePath: user.profile_picture_path,
        permission: user.permission_id
      },
      config.JWT_SECRET
    );

    return token;
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception at signIn:signIn',
      err
    });

    throw err;
  }
};

module.exports = signIn;
