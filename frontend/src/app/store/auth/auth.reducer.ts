import { createReducer, on } from "@ngrx/store";
import { User } from "../../types/user.interface";
import { CreateAccount, CreateAccountErrored, CreateAccountSuccess, Login, LoginErrored, LoginSuccess, SetUser } from "./auth.actions";

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,
}

export const AuthReducer = createReducer(
  initialState,

  on(Login, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(LoginSuccess, (state, action) => ({ 
    ...state,
    isLoading: false,
    isAuthenticated: true,
    token: action.token,
  })),

  on(LoginErrored, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    token: null,
    isLoading: false,
  })),

  on(CreateAccount, (state) => ({
    ...state,
    isLoading: true,
  })),
  
  on(CreateAccountSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isAuthenticated: true,
    token: action.token,
  })),
  
  on(CreateAccountErrored, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    token: null,
    isLoading: false,
  })),

  on(SetUser, (state, action) => ({
    ...state,
    user: action.user,
  })),
);