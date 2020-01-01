const { createLogger, format, transports } = require('winston');
const LogzioWinstonTransport = require('winston-logzio');

const logLevelConstants = require('./logLevelConstants');
const config = require('../config');

const {
  combine,
  timestamp,
  prettyPrint,
  colorize,
  json,
  align,
  simple
} = format;

const winstonTransports = [];
winstonTransports.push(new transports.Console());
winstonTransports.push(
  new transports.File({
    filename: `../../../logs/${logLevelConstants.ERROR}.log`,
    level: logLevelConstants.ERROR
  })
);
winstonTransports.push(
  new transports.File({
    filename: `../../../logs/${logLevelConstants.WARN}.log`,
    level: logLevelConstants.WARN
  })
);
winstonTransports.push(
  new transports.File({
    filename: `../../../logs/${logLevelConstants.INFO}.log`,
    level: logLevelConstants.INFO
  })
);

if (config.LOGZIO_TOKEN) {
  winstonTransports.push(
    new LogzioWinstonTransport({
      level: logLevelConstants.ERROR,
      name: 'winston_logzio',
      token: config.LOGZIO_TOKEN,
      host: 'listener.logz.io'
    })
  );
  winstonTransports.push(
    new LogzioWinstonTransport({
      level: logLevelConstants.WARN,
      name: 'winston_logzio',
      token: config.LOGZIO_TOKEN,
      host: 'listener.logz.io'
    })
  );
  winstonTransports.push(
    new LogzioWinstonTransport({
      level: logLevelConstants.INFO,
      name: 'winston_logzio',
      token: config.LOGZIO_TOKEN,
      host: 'listener.logz.io'
    })
  );
}

const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
    colorize(),
    json(),
    align(),
    simple()
  ),
  transports: winstonTransports,
  exitOnError: false
});

logger.INFO = logLevelConstants.INFO;
logger.WARN = logLevelConstants.WARN;
logger.ERROR = logLevelConstants.ERROR;

if (config.LOGZIO_TOKEN) {
  logger.log({
    level: logLevelConstants.INFO,
    message: 'logz.io token provided.'
  });
} else {
  logger.log({
    level: logLevelConstants.ERROR,
    message: 'logz.io token not provided, will not log to logz.io'
  });
}

module.exports = logger;
