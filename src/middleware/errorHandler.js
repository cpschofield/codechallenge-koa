import { logger } from '../service';

export const errorHandler = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(err);
    ctx.status = 400;
    ctx.body = {
      error: 'Could not decode request: JSON parsing failed',
    };
  }
};
