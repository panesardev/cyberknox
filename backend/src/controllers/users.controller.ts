import { Request, Response, Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";

export class UsersController {
  readonly router = Router();

  constructor() {
    this.router.get('/:id', isAuthenticated, this.findById);
  }

  async findById(request: Request, response: Response) {
    const id = Number(request.params.id);
    const user = await UserService.findById(id);
    response.json(user);
  }
}
