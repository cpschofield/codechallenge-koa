import { logger } from '../services';

export const mapShowBriefResponse = async (ctx) => {
  logger.info('mapShowBriefResponse');
  ctx.body = { a: 'response' };
};
