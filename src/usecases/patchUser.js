const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const db = require('../db');
const config = require('../commons/config');
const { logger, logLevels } = require('../commons/logging');

const patchPassword = async (id, password) => {
  const hashedPassword = await argon2.hash(password);
  await db.users.patchPassword(id, hashedPassword);
};

const patchProfilePicturePath = async (id, profilePicturePath) => {
  await db.users.patchProfilePicturePath(id, profilePicturePath);
};

const patchEmail = async (id, email) => {
  await db.users.patchEmail(id, email);
};

const patchUser = async (params, body) => {
  try {
    console.log(body.email);
    const { password, profilePicturePath, email } = body;
    if (password) await patchPassword(params.id, password);
    if (profilePicturePath)
      await patchProfilePicturePath(params.id, profilePicturePath);
    if (email) await patchEmail(params.id, email);

    const user = await db.users.getUserById(params.id);
    return jwt.sign(
      {
        _id: user.id,
        username: user.username,
        email: user.email,
        profilePicturePath: user.profile_picture_path,
        permission: user.permission_id
      },
      config.JWT_SECRET
    );
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
