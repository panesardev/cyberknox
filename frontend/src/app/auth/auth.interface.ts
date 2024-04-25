import { JwtPayload } from 'jsonwebtoken';
import { Address } from "../types/address.interface";
import { User } from "../types/user.interface";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CreateAccountRequestBody {
  user: Partial<User>;
  address: Partial<Address>;
}

export interface AuthResponse {
  message?: string;
  token: string | null;
}

export interface ExtendedJwtPayload extends JwtPayload {
  userId: User['id'];
}
