import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { IndexController } from './controllers/index.controller';

require('dotenv').config();

export class App {
  private static instance: App;
  private express = express();

  static getInstance(): App {
    if (!App.instance) App.instance = new App();
    return App.instance;
  }

  private useControllers() {
    this.express.use('/', new IndexController().router);
  }

  private async initializeDatabase() {

  }

  getExpress() {
    this.express.use(compression());
    this.express.use(cors());
    this.express.use(express.json());

    this.useControllers();
    this.initializeDatabase();

    return this.express;
  }

  run(port: number) {
    this.getExpress().listen(port, () =>
      console.log(`Express running at PORT:${port}`),
    );
  }

}