import Router from 'koa-router';
import * as api from '../api';
import { validateRequestBody } from '../middleware';
import { validateRequestJSON } from '../validation';

const attachRoutes = (router) => {
  router.get(
    '/hello',
    async (ctx, next) => await next(),
    async (ctx) => {
      ctx.body = { response: 'hello world' };
    },
  );
  router.post('/', validateRequestBody(validateRequestJSON), api.mapShowBriefResponse);
  return router;
};

export const createRouter = (options = {}) => attachRoutes(new Router(options));
