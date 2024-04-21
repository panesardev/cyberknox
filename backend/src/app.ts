import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { AuthController } from './auth/auth.controller';
import { UserController } from './domains/users/user.controller';
import { AppDataSource } from '../src/database';
import { AddressController } from './domains/addresses/address.controller';
import { CardController } from './domains/cards/card.controller';
import { isAuthenticated } from './auth/auth.middleware';

export default class App {
  private static instance: App;
  private server = express();

  static getInstance(): App {
    if (!App.instance) App.instance = new App();
    return App.instance;
  }

  private registerControllers() {
    this.server.use('/auth', new AuthController().router);
    this.server.use('/user', isAuthenticated, new UserController().router);
    this.server.use('/address', isAuthenticated, new AddressController().router);
    this.server.use('/card', isAuthenticated, new CardController().router);
  }

  private async initializeDatabase() {
    await AppDataSource.initialize();
  }

  getExpress() {
    this.server.use(compression());
    this.server.use(cors());
    this.server.use(express.json());

    this.registerControllers();
    this.initializeDatabase();

    return this.server;
  }

  run(port: number) {
    this.getExpress().listen(port, () =>
      console.log(`Express running at PORT:${port}`),
    );
  }

}