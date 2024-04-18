import { Address } from "./address.interface";
import { User } from "./user.interface";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CreateAccountRequestBody {
  user: Partial<User>;
  address: Partial<Address>;
}

export interface AuthResponse {
  code: 200 | 400;
  message?: string;
  token: string | null;
}

export interface JwtPayload {
  userId: User['id'];
}

export function decode(token: string): JwtPayload {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT token');
  }
  const payload = atob(parts[1]); // decode base64 encoded payload
  return JSON.parse(payload); // parse JSON payload
}