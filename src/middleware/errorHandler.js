import { logger } from '../service';

export const errorHandler = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.response && err.response.data) {
      ctx.status = err.response.status;
      ctx.body = { ...err.response.data };
      return;
    }
    logger.error(err);
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
};
