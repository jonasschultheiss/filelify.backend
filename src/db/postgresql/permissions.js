const { newPool } = require('../../commons/pool');
const { logger, logLevels } = require('../../commons/logging');

const listPermissions = async () => {
  const pool = newPool();
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

const getPermission = async name => {
  const pool = newPool();
  try {
    const {
      rows
    } = await pool.query('select * from permissions where name = $1', [name]);

    logger.info('successfully queried permissions table.');

    pool.end();
    return rows[0];
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

module.exports = {
  listPermissions,
  getPermission
};
