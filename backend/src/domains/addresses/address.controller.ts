import { Request, Response, Router } from "express";
import { HttpResponse } from "../../../src/interfaces/http.interface";
import { AddressService } from "./address.service";
import { Address } from "./address.entity";

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
      response.json({ payload: address } satisfies HttpResponse<Address>);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse<Address>);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const body: Address = request.body;
      const address = await AddressService.update(body);
      response.json({ payload: address } satisfies HttpResponse<Address>);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse<Address>);
    }
  }
}
