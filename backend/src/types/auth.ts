import { InsertableAddress, InsertableUser } from "../database/tables";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CreateAccountRequestBody {
  user: InsertableUser;
  address: InsertableAddress;
}

export interface AuthResponse {
  code: 200 | 400;
  message?: string;
  token: string | null;
}