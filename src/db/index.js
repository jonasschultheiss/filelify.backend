const config = require('../commons/config');
const { logger, logLevels } = require('../commons/logging');
const permissionConstants = require('./permissionConstants');

let db;

const postgresql = require('./postgresql');

switch (config.DBTYPE) {
  case 'postgresql':
    db = postgresql;
    break;

  default:
    logger.log({
      level: logLevels.ERROR,
      message: 'no db selected.'
    });
    break;
}

module.exports = {
  permissions: {
    getAllPermissions: db.permissions.listPermissions,
    getSpecificPermissions: db.permissions.getPermission,
    ...permissionConstants
  },
  users: {
    getUser: db.users.getUser,
    listUsers: db.users.listUsers,
    createUser: db.users.createUser,
    patchPassword: db.users.patchPassword,
    patchEmail: db.users.patchEmail,
    patchPermission: db.users.patchPermission,
    patchProfilePicturePath: db.users.patchProfilePicturePath
  }
};
