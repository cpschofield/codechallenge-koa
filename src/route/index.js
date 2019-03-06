import Router from 'koa-router';
import * as handler from '../handler';
import { validateRequestBody } from '../middleware';
import { validateRequestJSON } from '../validation';

const attachRoutes = (router) => {
  router.get('/hello', async (ctx) => {
    ctx.body = { response: 'hello world' };
  });
  router.post('/', validateRequestBody(validateRequestJSON), handler.mapShowBriefResponse);
  return router;
};

export const createRouter = (options = {}) => attachRoutes(new Router(options));
