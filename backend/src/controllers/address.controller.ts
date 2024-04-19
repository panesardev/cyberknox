import { Request, Response, Router } from "express";
import { HttpResponse } from "../types/response";
import { Address } from "../database/entities";
import { AddressService } from "../services/address.service";

export class AddressController {
  readonly router = Router();

  constructor() {
    this.router.get('/:id', this.findById);
    this.router.patch('/', this.update);
  }
  
  async findById(request: Request, response: Response) {
    try {
      const id: Address['id'] = Number(request.params.id);
      const address = await AddressService.findById(id);
      response.json({ payload: address } satisfies HttpResponse);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const body: Address = request.body;
      const address = await AddressService.update(body);
      response.json({ payload: address } satisfies HttpResponse);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse);
    }
  }
}
