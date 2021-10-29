const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} - ${level.toUpperCase()}: ${message} ${stack ? `
    Error Stack : ${stack}` : ''}`;
});

const logger = createLogger({
    format: combine(
        format.errors({ stack: true }),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss.sss' }),
        prettyPrint(),
        myFormat,
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/info.log', level: 'info' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple(),
    }), ({ 'timestamp': true, 'colorize': true }));
}

module.exports = {
    logger,
};