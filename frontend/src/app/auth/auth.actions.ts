import { CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";

export interface AuthAction {}

export class InitAction implements AuthAction {}

export class CreateAccountAction implements AuthAction {
  constructor(public body: CreateAccountRequestBody) {}
}

export class LoginAction implements AuthAction {
  constructor(public body: LoginRequestBody) {}
}

export class LogoutAction implements AuthAction {}

