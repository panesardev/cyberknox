import { inject, Injectable } from '@angular/core';
import { decodeJwt } from 'jose';
import { BehaviorSubject, catchError, concatMap, map, Observable, of, startWith, switchMap } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { AuthAction, CreateAccountAction, InitAction, LoginAction, LogoutAction } from './auth.actions';
import { AuthState, ExtendedJwtPayload, initialState } from './auth.interface';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private storage = inject(StorageService);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  private actions = new BehaviorSubject<AuthAction>(new InitAction());

  state$: Observable<AuthState> = this.actions.pipe(
    startWith(initialState),
    concatMap(action => {
      if (action instanceof InitAction) {
        const token = this.storage.get('token');
        if (token) {
          const { userId } = decodeJwt(token) as ExtendedJwtPayload;
          return this.userService.findById(userId).pipe(
            map(userResponse => ({
              isAuthenticated: true,
              token,
              user: userResponse.payload,
            })),
            catchError(e => {
              if (e.status === 403) this.storage.remove('token');
              return of(initialState);
            }),
          );
        }
      }
      if (action instanceof LoginAction) {
        return this.authService.login(action.body).pipe(
          switchMap(authResponse => {
            this.storage.set('token', authResponse.token);
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
        return this.authService.createAccount(action.body).pipe(
          switchMap(authResponse => {
            this.storage.set('token', authResponse.token);
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
        this.storage.remove('token');
      }
      return of(initialState);
    }),
    catchError(e => {
      console.log(e);
      return of(initialState);
    }),
  );
    
  dispatch(action: AuthAction) {
    this.actions.next(action);
  }

}
