import Router from 'koa-router';

const attachRoutes = (router) => {
  router.get(
    '/hello',
    async (ctx, next) => await next(),
    async (ctx) => {
      ctx.body = { response: 'hello world' };
    },
  );
  return router;
};

export const createRouter = (options = {}) => attachRoutes(new Router(options));
