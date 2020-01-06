const db = require('../db');
const { logger, logLevels } = require('../commons/logging');

const getUser = async params => {
  try {
    const { id } = params;
    const user = await db.users.getUserById(id);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      profile_picture_path: user.profile_picture_path,
      created_at: user.created_at,
      permission_id: user.permission_id
    };
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception at getUser:getUser',
      err
    });

    throw err;
  }
};

module.exports = getUser;
