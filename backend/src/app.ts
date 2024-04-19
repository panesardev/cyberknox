import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { AppDataSource } from './database';
import { AddressController } from './controllers/address.controller';
import { CardController } from './controllers/card.controller';
import { isAuthenticated } from './middlewares/auth.middleware';

require('dotenv').config();

export class App {
  private static instance: App;
  private express = express();

  static getInstance(): App {
    if (!App.instance) App.instance = new App();
    return App.instance;
  }

  private useControllers() {
    this.express.use('/auth', new AuthController().router);
    this.express.use('/user', isAuthenticated, new UserController().router);
    this.express.use('/address', isAuthenticated, new AddressController().router);
    this.express.use('/card', isAuthenticated, new CardController().router);
  }

  async useDatabase() {
    await AppDataSource.initialize();
  }

  getExpress() {
    this.express.use(compression());
    this.express.use(cors());
    this.express.use(express.json());

    this.useControllers();
    this.useDatabase();

    return this.express;
  }

  run(port: number) {
    this.getExpress().listen(port, () =>
      console.log(`Express running at PORT:${port}`),
    );
  }

}