import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { setupSwagger } from '../middlewares/swagger.middleware';
import { welcome } from '../utils/startupMessage.util';
import { dbHost, dbName } from '../configs/db.config';
import { globalRateLimiter } from '../middlewares/apiRateLimiter.middleware';
import l from '../utils/logger.util';

const app: Application = express();

export default class ExpressServer {
  private routes: any;
  constructor() {
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(cors());
    app.use(globalRateLimiter);
    setupSwagger(app);
  }
  router(routes: any) {
    this.routes = routes;
    return this;
  }

  listen(port: number | string = process.env.PORT!) {
     try {
      // Register routes
      if (this.routes) {
        this.routes(app);
      }
      // Start server
      http.createServer(app).listen(port, welcome(port, dbName!, dbHost!));
      return app;
    } catch (err) {
      l.error(err);
      process.exit(1);
    }
  }
}
