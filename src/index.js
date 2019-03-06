import Koa from 'koa';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import error from 'koa-json-error';
import compose from 'koa-compose';
import { errorHandler } from './middleware';
import { config } from './config';
import { logger } from './service';
import { createRouter as createApiRoute } from './route';

const onError = (err) => {
  if (err.message.includes('in JSON')) return { error: 'Could not decode request: JSON parsing failed' };
  return { error: err.message };
};

const app = new Koa();
const apiRouter = createApiRoute({ prefix: '' });
const globalMiddlewares = [errorHandler(), error(onError), bodyParser()];
if (process.env.NODE_ENV === 'production') globalMiddlewares.push(cors());

app.use(compose([...globalMiddlewares, apiRouter.allowedMethods(), apiRouter.routes()]));

const listenPort = process.env.NODE_ENV === 'production' ? 80 : config.app.port;
const appListener = app.listen(listenPort, () => {
  logger.info(`App listening on port ${listenPort}!`);
});

export { appListener as app };
