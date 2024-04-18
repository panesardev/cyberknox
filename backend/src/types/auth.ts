import { Address, User } from "../database/entities";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CreateAccountRequestBody {
  user: User;
  address: Address;
}

export interface AuthResponse {
  message?: string;
  token: string | null;
}