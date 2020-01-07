require('dotenv').config();

const http = require('http');
// const { Client } = require('pg');
const express = require('express');

const app = express();
const { createTerminus } = require('@godaddy/terminus');

const config = require('./src/commons/config');
const routes = require('./src/routes');
const middleware = require('./src/middleware');
const { logger, logLevels } = require('./src/commons/logging');

logger.log({
  level: logLevels.INFO,
  message: 'database url',
  config: config.DATABASE_URL
});

const port = config.PORT || 3000;

app.use(middleware);

app.set('trust proxy', 1);
app.use('/api/v1', [routes]);

const server = http.createServer(app);

function onSignal() {
  logger.log({
    level: 'info',
    message: 'Server got SIGINT and will now cleanup before shutting down.'
  });

  // return Promise.all([client.end]);
  return Promise.all();
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
  signal: 'SIGINT',
  healthChecks: {
    '/api/healthcheck': healthCheck,
    verbatim: true
  },
  timeout: 1000,
  onSignal,
  onShutdown
};

createTerminus(server, options);

// client
//   .connect()
//   .then(() => {
//     logger.log({
//       level: logLevels.INFO,
//       message: 'Connected successfully to db.'
//     });
//   })
//   .catch(err => {
//     logger.log({
//       level: logLevels.ERROR,
//       message: 'Exception while trying to connect to db.',
//       err
//     });
//   });

server.listen(port, () => {
  logger.log({
    level: logLevels.INFO,
    message: `Server has started and listens to port ${port}.`,
    port
  });
});
