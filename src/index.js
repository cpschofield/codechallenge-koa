import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import error from 'koa-json-error';
import compose from 'koa-compose';
import { errorHandler } from './middleware';
import { config } from './config';
import { logger } from './service';
import { createRouter as createApiRoute } from './route';

const onError = (err) => {
  if (err.message.includes('in JSON')) return { Error: 'Could not decode request: JSON parsing failed' };
  return { Error: err.message };
};

const app = new Koa();
const apiRouter = createApiRoute({ prefix: '' });
const globalMiddlewares = [errorHandler(), error(onError), bodyParser()];

app.use(compose([...globalMiddlewares, apiRouter.allowedMethods(), apiRouter.routes()]));

const listenPort = process.env.NODE_ENV === 'production' ? process.env.PORT : config.app.port;
const appListener = app.listen(listenPort, () => {
  logger.info(`App listening on port ${listenPort}!`);
});

export { appListener as app };
