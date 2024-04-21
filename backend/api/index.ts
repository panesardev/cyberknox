import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import { AuthController } from './auth/auth.controller';
import { UserController } from './domains/users/user.controller';
import { AppDataSource } from './database';
import { AddressController } from './domains/addresses/address.controller';
import { CardController } from './domains/cards/card.controller';
import { isAuthenticated } from './auth/auth.middleware';

export default function createServer(): Express {
  const server = express();

  server.use(compression());
  server.use(cors());
  server.use(express.json());
  
  AppDataSource.initialize();
  
  server.use('/auth', new AuthController().router);
  server.use('/user', isAuthenticated, new UserController().router);
  server.use('/address', isAuthenticated, new AddressController().router);
  server.use('/card', isAuthenticated, new CardController().router);

  return server;
}
