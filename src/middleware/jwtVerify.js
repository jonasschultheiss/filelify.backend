const jwt = require('jsonwebtoken');

const config = require('../commons/config');

const jwtVerify = async (req, res, next) => {
  if (!req.body.token) res.status(401).send('Token not provided.');
  const { token } = req.body;
  try {
    await jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    res.status(401).send('Token not valid.');
  }

  next();
};

module.exports = jwtVerify;
