import { Request, Response, Router } from "express";
import { db } from "../database";
import { SelectableUser } from "../database/tables";
import { isAuthenticated } from "../middlewares/auth.middleware";

export class UsersController {
  readonly router = Router();

  constructor() {
    this.router.get('/:id', isAuthenticated, this.findById);
  }

  async findById(request: Request, response: Response) {
    const id = Number(request.params.id);
    const user = await db.selectFrom('user').where('id', '==', id).executeTakeFirst() as SelectableUser;
    response.json(user);
  }
}
