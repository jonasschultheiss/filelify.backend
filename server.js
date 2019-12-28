require('dotenv').config();

const http = require('http');
const {
  Client
} = require('pg');
const express = require('express');

const app = express();
const {
  createTerminus
} = require('@godaddy/terminus');

const config = require('./src/config');
const routes = require('./src/routes/index');
const {
  logger,
  logLevels
} = require('./src/commons/logging');

const client = process.env.DATABASE_URL ? new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
}) : new Client();

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
    message: 'Server has finished cleanup'
  });
}

function healthCheck() {
  return Promise.resolve();
}

const options = {
  healthChecks: {
    '/healthcheck': healthCheck,
    verbatim: true
  },
  timeout: 1000,
  onSignal,
  onShutdown
};

createTerminus(server, options);

server.listen(port, () => {
  logger.log({
    level: logLevels.INFO,
    message: `server has started and listens to port ${port}`,
    port
  });
});