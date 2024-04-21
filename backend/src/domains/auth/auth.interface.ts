import { Address } from "../addresses/address.entity";
import { User } from "../users/user.entity";

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