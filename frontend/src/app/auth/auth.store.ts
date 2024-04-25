import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../types/user.interface';
import { AuthAction, AuthInitAction, CreateAccountAction, LoginAction, LogoutAction } from './auth.actions';
import { AuthService } from './auth.service';
import { decodeJwt } from 'jose';
import { ExtendedJwtPayload } from './auth.interface';

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private auth = inject(AuthService);
  private userService = inject(UserService);

  private authState = new BehaviorSubject<AuthState>(initialState);
  private actions = new BehaviorSubject<AuthAction>(new AuthInitAction());

  readonly authState$ = this.authState.asObservable();

  constructor() {
    this.actions.pipe(
      switchMap(action => {
        if (action instanceof AuthInitAction) {
          const token = this.auth.getToken();
          if (token) {
            const { userId } = decodeJwt(token) as ExtendedJwtPayload;
            return this.userService.findById(userId).pipe(
              map(userResponse => ({
                isAuthenticated: true,
                token,
                user: userResponse.payload,
              })),
              catchError(e => {
                if (e.status === 403) this.auth.removeToken();
                return of(initialState);
              }),
            );
          }
        }
        if (action instanceof LoginAction) {
          return this.auth.login(action.body).pipe(
            switchMap(authResponse => {
              this.auth.saveToken(authResponse.token);
              const { userId } = decodeJwt(authResponse.token) as ExtendedJwtPayload;
              return this.userService.findById(userId).pipe(
                map(userResponse => ({
                  isAuthenticated: true,
                  token: authResponse.token,
                  user: userResponse.payload,
                })),
              );
            }),
          );
        }
        if (action instanceof CreateAccountAction) {
          return this.auth.createAccount(action.body).pipe(
            switchMap(authResponse => {
              this.auth.saveToken(authResponse.token);
              const { userId } = decodeJwt(authResponse.token) as ExtendedJwtPayload;
              return this.userService.findById(userId).pipe(
                map(userResponse => ({
                  isAuthenticated: true,
                  token: authResponse.token,
                  user: userResponse.payload,
                })),
              );
            }),
          );
        }
        if (action instanceof LogoutAction) {
          this.auth.removeToken();
          return of(initialState);
        }
        return of(null);
      }),
      tap(v => console.log(v)),
      catchError(e => {
        console.log(e);
        return of(initialState);
      }),
    ).subscribe({
      next: state => this.authState.next(state),
      error: e => this.authState.next(initialState),
    });
  }

  dispatch(action: AuthAction) {
    this.actions.next(action);
  }

  snapshot(): AuthState {
    return this.authState.getValue();
  }

}