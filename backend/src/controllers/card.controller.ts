import { Request, Response, Router } from "express";
import { CardService } from "../services/card.service";
import { Card } from "../database/entities";
import { HttpResponse } from "../types/response";

export class CardController {
  readonly router = Router();

  constructor() {
    this.router.get('/:id', this.findById);
    this.router.post('/:type', this.create);
    this.router.delete('/:id', this.remove);
  }

  async findById(request: Request, response: Response) {
    try {
      const id: Card['id'] = Number(request.params.id);
      const card = await CardService.findById(id);
      response.json({ payload: card } satisfies HttpResponse);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse);
    }
  }

  async create(request: Request, response: Response) {
    try {
      const type = request.params.type as Card['type'];
      const card = await CardService.create(type);
      response.json({ payload: card } satisfies HttpResponse);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse);
    }
  }

  async remove(request: Request, response: Response) {
    try {
      const id: Card['id'] = Number(request.params.id);
      await CardService.remove(id);
      response.json({ message: 'deleted' } satisfies HttpResponse);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse);
    }
  }

}