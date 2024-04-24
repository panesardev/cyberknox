import { Request, Response, Router } from "express";
import { HttpResponse } from "../../../src/interfaces/http.interface";
import { AccountService } from "./account.service";
import { Account } from "./account.entity";

export class AccountController {
  readonly router = Router();

  constructor() {
    this.router.get('/:id', this.findById);
    this.router.patch('/', this.update);
  }
  
  async findById(request: Request, response: Response) {
    try {
      const id: Account['id'] = Number(request.params.id);
      const account = await AccountService.findById(id);
      response.json({ payload: account } satisfies HttpResponse<Account>);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse<Account>);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const body: Account = request.body;
      const account = await AccountService.update(body);
      response.json({ payload: account } satisfies HttpResponse<Account>);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse<Account>);
    }
  }
}
