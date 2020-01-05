const argon2 = require('argon2');

const hashPassword = async password => {
  return argon2.hash(password);
};

module.exports = { hashPassword };
