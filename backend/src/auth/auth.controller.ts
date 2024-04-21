import { Request, Response, Router } from "express";
import { AuthResponse, CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";
import { AuthService } from "./auth.service";

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
      authResponse = { token };
      response.json(authResponse);

    } catch (e) {
      authResponse = { token: null, message: e.message };
      response.json(authResponse);
    }
  }

  async createAccount(request: Request, response: Response) {
    const body = request.body as CreateAccountRequestBody;
    let authResponse: AuthResponse = null;

    try {
      const token = await AuthService.createAccount(body);
      authResponse = { token };
      response.json(authResponse);

    } catch (e) {
      authResponse = { token: null, message: e.message };
      response.json(authResponse);
    }
  }
}

