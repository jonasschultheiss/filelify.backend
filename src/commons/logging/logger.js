const { createLogger, format, transports } = require('winston');
const LogzioWinstonTransport = require('winston-logzio');

const logLevelConstants = require('./logLevelConstants');
const config = require('../../config');

const {
  combine,
  timestamp,
  prettyPrint,
  colorize,
  json,
  align,
  simple
} = format;

const transportConsole = new transports.Console();
const transportFileErr = new transports.File({
  filename: `../../../logs/${logLevelConstants.ERROR}.log`,
  level: logLevelConstants.ERROR
});
const transportFileWarn = new transports.File({
  filename: `../../../logs/${logLevelConstants.WARN}.log`,
  level: logLevelConstants.WARN
});
const transportFileInfo = new transports.File({
  filename: `../../../logs/${logLevelConstants.INFO}.log`,
  level: logLevelConstants.INFO
});
const transportWebErr = new LogzioWinstonTransport({
  level: logLevelConstants.ERROR,
  name: 'winston_logzio',
  token: config.LOGZIO_TOKEN,
  host: 'listener.logz.io'
});
const transportWebWarn = new LogzioWinstonTransport({
  level: logLevelConstants.WARN,
  name: 'winston_logzio',
  token: config.LOGZIO_TOKEN,
  host: 'listener.logz.io'
});
const transportWebInfo = new LogzioWinstonTransport({
  level: logLevelConstants.INFO,
  name: 'winston_logzio',
  token: config.LOGZIO_TOKEN,
  host: 'listener.logz.io'
});

const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
    colorize(),
    json(),
    align(),
    simple()
  ),
  transports: [
    transportConsole,
    transportFileInfo,
    transportFileWarn,
    transportFileErr,
    transportWebInfo,
    transportWebWarn,
    transportWebErr
  ],
  exitOnError: false
});

logger.INFO = logLevelConstants.INFO;
logger.WARN = logLevelConstants.WARN;
logger.ERROR = logLevelConstants.ERROR;

module.exports = logger;
