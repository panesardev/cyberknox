import { createAction, props } from '@ngrx/store';
import { AuthResponse, CreateAccountRequestBody, LoginRequestBody } from '../../types/auth.interface';
import { User } from '../../types/user.interface';

export const Login = createAction(
  '[AUTH] Login',
  props<LoginRequestBody>(),
);

export const LoginSuccess = createAction(
  '[AUTH] Login Success',
  props<AuthResponse>(),
);

export const LoginErrored = createAction(
  '[AUTH] Login Errored',
  props<AuthResponse>(),
);

export const CreateAccount = createAction(
  '[AUTH] Create Account',
  props<CreateAccountRequestBody>(),
);

export const CreateAccountSuccess = createAction(
  '[AUTH] Create Account Success',
  props<AuthResponse>(),
);

export const CreateAccountErrored = createAction(
  '[AUTH] Create Account Errored',
  props<AuthResponse>(),
);

export const Logout = createAction(
  '[AUTH] Logout',
);

export const SetUser = createAction(
  '[AUTH] Set User',
  props<{ user: User }>(),
);

