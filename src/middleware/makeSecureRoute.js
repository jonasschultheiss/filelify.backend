const jwt = require('jsonwebtoken');

const config = require('../commons/config');
const db = require('../db');

const selfAndAdmin = async (req, res, next) => {
  try {
    const token = await jwt.decode(
      req.body.token || req.headers.token,
      config.JWT_SECRET
    );
    const { id } = req.params;
    const permission = await db.permissions.getSpecificPermissionsById(
      token.permission
    );
    const { _id } = token;
    if (permission.name === db.permissions.ADMIN) {
      next();
    } else if (parseInt(id, 10) === _id) {
      next();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(500).send();
  }
};

const onlyAdmin = async (req, res, next) => {
  try {
    const token = await jwt.decode(req.body.token, config.JWT_SECRET);
    const permission = await db.permissions.getSpecificPermissionsById(
      token.permission
    );
    if (permission.name !== db.permissions.ADMIN) res.status(401).send();

    next();
  } catch (err) {
    res.status(500).send();
  }
};

const makeSecureRoute = adminOnly => {
  return adminOnly ? onlyAdmin : selfAndAdmin;
};

module.exports = makeSecureRoute;
