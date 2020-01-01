require('dotenv').config();

const http = require('http');
const { Client } = require('pg');
const express = require('express');

const app = express();
const { createTerminus } = require('@godaddy/terminus');

const config = require('./src/config');
const routes = require('./src/routes/index');
const { logger, logLevels } = require('./src/commons/logging');

const client = config.PG.DATABASE
  ? new Client({
      user: config.PG.USER,
      host: config.PG.HOST,
      database: config.PG.DATABASE,
      password: config.PG.PASSWORD,
      port: config.PG.PORT
    })
  : new Client();
const port = config.PORT || 3000;

app.use('/api/v1', [routes]);
const server = http.createServer(app);

function onSignal() {
  logger.log({
    level: 'info',
    message: 'Server got SIGTERM and will now cleanup before shutting down.'
  });

  return Promise.all([client.end]);
}

function onShutdown() {
  logger.log({
    level: 'info',
    message: 'Server has finished cleanup.'
  });
}

function healthCheck() {
  return Promise.resolve();
}

const options = {
  healthChecks: {
    '/api/healthcheck': healthCheck,
    verbatim: true
  },
  timeout: 1000,
  onSignal,
  onShutdown
};

createTerminus(server, options);

client
  .connect()
  .then(() => {
    logger.log({
      level: logLevels.INFO,
      message: 'Connected successfully to db.'
    });
  })
  .catch(err => {
    logger.log({
      level: logLevels.ERROR,
      message: 'Exception while trying to connect to db.',
      err
    });
  });

server.listen(port, () => {
  logger.log({
    level: logLevels.INFO,
    message: `Server has started and listens to port ${port}.`,
    port
  });
});
