module.exports = {
  PORT: process.env.PORT,
  PG: {
    USER: process.env.PGUSER,
    HOST: process.env.PGHOST,
    DATABASE: process.env.PGDATABASE,
    PASSWORD: process.env.PGPASSWORD,
    PORT: process.env.PGPORT
  },
  LOGZIO_TOKEN: process.env.LOGZIO_TOKEN,
  DATABASE_URL: process.env.DATABASE_URL,
  DBTYPE: process.env.DBTYPE,
  JWT_SECRET: process.env.JWT_SECRET
};
