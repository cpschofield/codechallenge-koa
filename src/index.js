import Koa from 'koa';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import compose from 'koa-compose';
import { config } from './config';
import { logger } from './services';
import { createRouter as createApiRoute } from './route';

const app = new Koa();
const apiRouter = createApiRoute({ prefix: '' });
const globalMiddlewares = [bodyParser()];
if (process.env.NODE_ENV === 'production') globalMiddlewares.push(cors());

app.use(compose([...globalMiddlewares, apiRouter.allowedMethods(), apiRouter.routes()]));

const listenPort = process.env.NODE_ENV === 'production' ? 80 : config.app.port;
const appListener = app.listen(listenPort, () => {
  logger.info(`App listening on port ${listenPort}!`);
});

export { appListener as app };
