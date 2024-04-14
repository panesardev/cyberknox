import { Request, Response, Router } from "express";

export class IndexController {
  readonly router = Router();

  constructor() {
    this.router.get('/', this.index);
  }

  async index(request: Request, response: Response) {
    response.send('Express api starter project');
  }
}