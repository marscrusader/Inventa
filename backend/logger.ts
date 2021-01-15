import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: format.combine(
    format.timestamp(),
    format.splat(),
    format.simple()
  ),
  transports: [
    new transports.Console()
  ],
});

// if (process.env.NODE_ENV === 'production') {
//   logger.add(
//     new transports.File({ filename: 'logs/error.log', level: 'error' })
//   )
// }

export default logger;
