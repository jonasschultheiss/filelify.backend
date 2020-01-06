const { Pool } = require('pg');

const config = require('../config');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${config.PG.USER}:${config.PG.PASSWORD}@${config.PG.HOST}:${config.PG.PORT}/${config.PG.DATABASE}`;

const newPool = () => {
  return new Pool({
    connectionString: isProduction
      ? process.env.DATABASE_URL
      : connectionString,
    ssl: isProduction
  });
};

module.exports = { newPool };
