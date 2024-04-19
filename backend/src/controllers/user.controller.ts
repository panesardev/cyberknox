import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { User } from "../database/entities";
import { HttpResponse } from "../types/response";
import { isOwner } from "../middlewares/auth.middleware";

export class UserController {
  readonly router = Router();

  constructor() {
    this.router.get('/:id', isOwner, this.findById);
  }

  async findById(request: Request, response: Response) {
    try {
      const id: User['id'] = Number(request.params.id);
      const { password, ...user } = await UserService.findById(id);
      response.json({ payload: user } satisfies HttpResponse);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse);
    }
  }
}
