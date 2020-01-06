const jwt = require('jsonwebtoken');

const config = require('../commons/config');

const didTokenExpire = token => {
  const aliveSince = Date.now() - token.iat * 1000;
  const maxAge = 25 * 60000;
  return aliveSince > maxAge;
};

const jwtVerify = async (req, res, next) => {
  if (!req.body.token) res.status(401).send('Token not provided.');
  const { token } = req.body;
  try {
    const decodedToken = await jwt.verify(token, config.JWT_SECRET);
    if (didTokenExpire(decodedToken)) res.status(401).send('Token expired.');
  } catch (err) {
    res.status(401).send('Token not valid.');
  }

  next();
};

module.exports = jwtVerify;
