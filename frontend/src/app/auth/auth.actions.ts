import { CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";

export interface AuthAction {}

export class AuthInitAction implements AuthAction {}

export class LoginAction implements AuthAction {
  constructor(public body: LoginRequestBody) {}
}

export class CreateAccountAction implements AuthAction {
  constructor(public body: CreateAccountRequestBody) {}
}

export class LogoutAction implements AuthAction {}

