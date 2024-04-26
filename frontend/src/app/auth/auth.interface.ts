import { JWTPayload } from 'jose';
import { Address } from "../types/address.interface";
import { User } from "../types/user.interface";

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
  token: string;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

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

export interface ExtendedJwtPayload extends JWTPayload {
  userId: User['id'];
}
