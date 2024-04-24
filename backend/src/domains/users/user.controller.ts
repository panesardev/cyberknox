import { Request, Response, Router } from "express";
import { UserService } from "./user.service";
import { HttpResponse } from "../../../src/interfaces/http.interface";
import { isOwner } from "../../middlewares/auth.middleware";
import { User } from "./user.entity";

export class UserController {
  readonly router = Router();

  constructor() {
    this.router.get('/:id', isOwner, this.findById);
  }

  async findById(request: Request, response: Response) {
    try {
      const id: User['id'] = Number(request.params.id);
      const { password, ...user } = await UserService.findById(id);
      response.json({ payload: user } satisfies HttpResponse<User>);
    }
    catch (e) {
      response.json({ message: e.message } satisfies HttpResponse<User>);
    }
  }
}
