import { Request, Response, Router } from "express";
import { AuthResponse, CreateAccountRequestBody, LoginRequestBody } from "../types/auth";
import { AuthService } from "../services/auth.service";

export class AuthController {
  readonly router = Router();

  constructor() {
    this.router.post('/login', this.login);
    this.router.post('/create-account', this.createAccount);
  }

  async login(request: Request, response: Response) {
    const body = request.body as LoginRequestBody;
    let authResponse: AuthResponse = null;

    try {
      const token = await AuthService.login(body);
      authResponse = { code: 200, token };
      response.status(200).json(authResponse);

    } catch (e) {
      authResponse = { code: 400, token: null, message: e.message };
      response.status(400).json(authResponse);
    }
  }

  async createAccount(request: Request, response: Response) {
    const body = request.body as CreateAccountRequestBody;
    let authResponse: AuthResponse = null;

    try {
      const token = await AuthService.createAccount(body);
      authResponse = { code: 200, token };
      response.status(200).json(authResponse);

    } catch (e) {
      authResponse = { code: 400, token: null, message: e.message };
      response.status(400).json(authResponse);
    }
  }
}

