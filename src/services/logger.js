import * as winston from 'winston';

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'storage/errors.log',
      maxsize: 2000000,
    }),
  ],
  format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
});
