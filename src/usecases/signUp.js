const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const db = require('../db');
const config = require('../commons/config');
const { logger, logLevels } = require('../commons/logging');

const signUp = async body => {
  try {
    const { username, password, email } = body;
    const userPermission = await db.permissions.getSpecificPermissionsByName(
      db.permissions.USER
    );
    const hashedPassword = await argon2.hash(password);
    const newUser = await db.users.createUser(
      username,
      hashedPassword,
      email,
      'https://filelifygg.fra1.digitaloceanspaces.com/_profilePictures/_default.png',
      userPermission.id
    );

    const token = await jwt.sign(
      {
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profilePicturePath: newUser.profile_picture_path,
        permission: userPermission.id
      },
      config.JWT_SECRET
    );

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
