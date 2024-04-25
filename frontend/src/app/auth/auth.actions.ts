import { CreateAccountRequestBody, LoginRequestBody } from "../types/auth.interface";

export interface AuthAction {}

export class AuthInitAction implements AuthAction {
  static readonly type = '[AUTH] Auth Init';
}

export class LoginAction implements AuthAction {
  static readonly type = '[AUTH] Login';
  constructor(public body: LoginRequestBody) {}
}

export class CreateAccountAction implements AuthAction {
  static readonly type = '[AUTH] Create Account';
  constructor(public body: CreateAccountRequestBody) {}
}

export class LogoutAction implements AuthAction {
  static readonly type = '[AUTH] Logout';
}