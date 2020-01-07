const { newPool } = require('../../commons/pool');
const { logger, logLevels } = require('../../commons/logging');

const createUser = async (
  username,
  hashedPassword,
  email,
  profilePicturePath,
  permissionId
) => {
  const pool = newPool();
  try {
    const {
      rows
    } = await pool.query(
      `insert into users (username, hashed_password, email, profile_picture_path, created_at, permission_id) values ($1, $2, $3, $4, to_timestamp($5 / 1000.0), $6) returning *`,
      [
        username,
        hashedPassword,
        email,
        profilePicturePath,
        Date.now(),
        permissionId
      ]
    );

    logger.log({
      level: logLevels.INFO,
      message: 'created new user.',
      user: rows
    });

    pool.end();
    return rows[0];
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception in query in users.js:createUser',
      err
    });
    pool.end();

    if (err.code === '23505') {
      throw Error('Name or Email already exist.');
    } else {
      throw err;
    }
  }
};

const getUserByName = async username => {
  const pool = newPool();
  try {
    const { rows } = await pool.query(
      'select * from users where username = $1',
      [username]
    );

    logger.log({
      level: logLevels.INFO,
      message: 'successfully queried user',
      user: rows
    });

    pool.end();
    return rows[0];
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception in query in users.js:getUser',
      err
    });

    pool.end();
    return err;
  }
};

const getUserById = async id => {
  const pool = newPool();
  try {
    const { rows } = await pool.query('select * from users where id = $1', [
      id
    ]);

    logger.log({
      level: logLevels.INFO,
      message: 'successfully queried user',
      user: rows
    });

    pool.end();
    return rows[0];
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception in query in users.js:getUser',
      err
    });

    pool.end();
    return err;
  }
};

const listUsers = async () => {
  const pool = newPool();
  try {
    const { rows } = await pool.query('select * from users');

    logger.log({
      level: logLevels.INFO,
      message: 'successfully queried users',
      user: rows
    });

    pool.end();
    return rows;
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception in query in users.js:listUsers',
      err
    });

    pool.end();
    return err;
  }
};

const patchPassword = async (userId, hashedPassword) => {
  const pool = newPool();
  try {
    const {
      rows
    } = await pool.query(
      'update users set hashed_password = $2 where id = $1 returning *',
      [userId, hashedPassword]
    );

    logger.log({
      level: logLevels.INFO,
      message: 'successfully updated users password',
      user: rows
    });

    pool.end();
    return rows;
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception in query in users.js:patchPassword',
      err
    });

    pool.end();
    return err;
  }
};

const patchEmail = async (userId, email) => {
  const pool = newPool();
  try {
    const {
      rows
    } = await pool.query(
      'update users set email = $2 where id = $1 returning *',
      [userId, email]
    );

    logger.log({
      level: logLevels.INFO,
      message: 'successfully updated users email',
      user: rows
    });

    pool.end();
    return rows;
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception in query in users.js:patchEmail',
      err
    });

    pool.end();
    return err;
  }
};

const patchProfilePicturePath = async (userId, profilePicturePath) => {
  const pool = newPool();
  try {
    const {
      rows
    } = await pool.query(
      'update users set profile_picture_path = $2 where id = $1 returning *',
      [userId, profilePicturePath]
    );

    logger.log({
      level: logLevels.INFO,
      message: 'successfully updated users profilePicturePath',
      user: rows
    });

    pool.end();
    return rows;
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception in query in users.js:patchProfilePicturePath',
      err
    });

    pool.end();
    return err;
  }
};

const patchPermission = async (userId, permissionId) => {
  const pool = newPool();

  try {
    const {
      rows
    } = await pool.query(
      'update users set permission_id = $2 where id = $1 returning *',
      [userId, permissionId]
    );

    logger.log({
      level: logLevels.INFO,
      message: 'successfully updated users permission',
      user: rows
    });

    pool.end();
    return rows;
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception in query in users.js:patchPermission',
      err
    });

    pool.end();
    return err;
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByName,
  listUsers,
  patchPassword,
  patchEmail,
  patchProfilePicturePath,
  patchPermission
};
