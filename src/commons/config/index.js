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
  JWT_SECRET: process.env.JWT_SECRET,
  AWS: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    ENDPOINT: process.env.AWS_ENDPOINT,
    BUCKET_NAME: process.env.AWS_BUCKET_NAME
  }
};
