import { logger } from '../services';

export const validateRequestBody = validator => async (ctx, next) => {
  logger.info('validation');
  const result = await validator(ctx.request.body);
  if (result.error !== undefined) {
    logger.info('validation:error');
    ctx.status = 400;
    ctx.body = {
      error: {
        code: 400,
        type: 'BAD_REQUEST',
        message: result.error.details[0].message,
      },
    };
    return;
  }
  await next();
};
