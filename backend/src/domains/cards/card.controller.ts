import { Request, Response, Router } from "express";
import { CardService } from "./card.service";
import { HttpResponse } from "../../../src/interfaces/http.interface";
import { Card } from "./card.entity";

export class CardController {
  readonly router = Router();

  constructor() {
    this.router.get('/:id', this.findById);
  }

  async findById(request: Request, response: Response) {
    try {
      const id: Card['id'] = Number(request.params.id);
      const card = await CardService.findById(id);
      response.json({ payload: card } satisfies HttpResponse<Card>);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse<Card>);
    }
  }

}