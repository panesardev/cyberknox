import { Request, Response, Router } from "express";
import { HttpResponse } from "../../interfaces/http.interface";
import { Account } from "../accounts/account.entity";
import { TransactionService } from "./transaction.service";
import { Transaction } from "./transaction.entity";

export class TransactionController {
  readonly router = Router();

  constructor() {
    this.router.get('/:accountId', this.findAllByAccountId);
    this.router.post('/', this.create);
  }

  async findAllByAccountId(request: Request, response: Response) {
    try {
      const accountId: Account['id'] = Number(request.params.accountId);
      const transactions = await TransactionService.findAllByAccountId(accountId);
      response.json({ payload: transactions } satisfies HttpResponse<Transaction[]>);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse<string>);
    }
  }

  async create(request: Request, response: Response) {
    try {
      const body: Transaction = request.body;
      await TransactionService.create(body);
      response.json({ message: 'created' } satisfies HttpResponse<string>);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse<string>);
    }
  }
}

