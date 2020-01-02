const { Pool } = require('pg');
const { logger, logLevels } = require('../../commons/logging');

const getAllPermissions = async () => {
  const pool = new Pool();
  try {
    const { rows } = await pool.query('select * from permissions');

    logger.info('successfully queried permissions table.');

    pool.end();
    return rows;
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception in query in permissions.js:getAllPermissions',
      err
    });

    pool.end();
    return err;
  }
};

const getUserPermissions = async () => {
  const pool = new Pool();
  try {
    const { rows } = await pool.query(
      "select * from permissions where name = 'user'"
    );

    logger.info('successfully queried permissions table.');

    pool.end();
    return rows;
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception in query in permissions.js:getUserPermissions',
      err
    });

    pool.end();
    return err;
  }
};

const getAdminPermissions = async () => {
  const pool = new Pool();
  try {
    const { rows } = await pool.query(
      "select * from permissions where name = 'admin'"
    );

    logger.info('successfully queried permissions table.');

    pool.end();
    return rows;
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception in query in permissions.js:getAdminPermissions',
      err
    });

    pool.end();
    return err;
  }
};

module.exports = { getAllPermissions, getUserPermissions, getAdminPermissions };
