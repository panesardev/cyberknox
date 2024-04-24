import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { AuthController } from './domains/auth/auth.controller';
import { UserController } from './domains/users/user.controller';
import { AppDataSource } from '../src/database';
import { AddressController } from './domains/addresses/address.controller';
import { CardController } from './domains/cards/card.controller';
import { isAuthenticated } from './middlewares/auth.middleware';
import { AccountController } from './domains/accounts/account.controller';
import { debug } from './middlewares/debug.middleware';

export default class App {
  private static instance: App;
  private server = express();

  static getInstance(): App {
    if (!App.instance) App.instance = new App();
    return App.instance;
  }

  private registerControllers() {
    this.server.use('/auth', new AuthController().router);
    this.server.use('/users', isAuthenticated, new UserController().router);
    this.server.use('/addresses', isAuthenticated, new AddressController().router);
    this.server.use('/cards', isAuthenticated, new CardController().router);
    this.server.use('/accounts', isAuthenticated, new AccountController().router);
  }

  private async initializeDatabase() {
    await AppDataSource.initialize();
  }

  getServer() {
    this.server.use(compression());
    this.server.use(cors());
    this.server.use(express.json());

    this.server.use(debug);

    this.registerControllers();
    this.initializeDatabase();

    return this.server;
  }

  startServer() {
    const PORT = Number(process.env.port);
    this.getServer().listen(PORT, () =>
      console.log(`Express running at PORT:${PORT}`),
    );
  }

}

