/* eslint-disable no-console */
import Koa from 'koa';
import '@babel/polyfill';
import cors from '@koa/cors';
import Logger from 'loglevel';
import Router from 'koa-router';
import dateFormat from 'dateformat';
import BodyParser from 'koa-bodyparser';


// Route imports
import index from './routes';
import mongodb from './services/MongoDB';
import log from './routes/v1/log/log.routes';
import { DATE_FORMAT } from './common/constants';
import tasks from './routes/v1/tasks/tasks.routes';
import projects from './routes/v1/projects/projects.routes';
import managers from './routes/v1/managers/managers.routes';

import config from './config';
import logger from './middleware/logger';

// Define logger level
Logger.setLevel(config.logLevel);

// Initialize server
Logger.info(`time="${dateFormat(Date.now(), DATE_FORMAT, true)}" level=INFO message="Initializing node-server..."`);

const koa = new Koa();

const router = Router();
const v1router = Router();

// to handle CORS
koa.use(cors());

// Declare v1 routes
v1router.use(log.routes());
v1router.use(tasks.routes());
v1router.use(projects.routes());
v1router.use(managers.routes());

// Declare root routes
router.use(index.routes());
router.use('/v1', v1router.routes());


// Dev logging middleware
koa.use(logger);

// Middleware
koa.use(BodyParser({
  extendTypes: {
    json: ['application/x-javascript', 'application/vnd.cia.v1+json'],
  },
}));


// Use routes
koa.use(router.routes());

// Listen to port
const port = config.serverPort;
const server = koa.listen(port, () => {
  Logger.info(`time="${dateFormat(Date.now(), DATE_FORMAT, true)}" level=INFO message="node-server started running on ${port}"`);
});

export default {
  server,
  mongodb,
};
