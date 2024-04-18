import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { CreateAccount, CreateAccountErrored, CreateAccountSuccess, Login, LoginErrored, LoginSuccess, Logout, SetUser } from "./auth.actions";
import { UserService } from "../../services/user.service";
import { decode } from "../../types/auth.interface";

export const login$ = createEffect(
  (actions$ = inject(Actions), auth = inject(AuthService)) => {
    return actions$.pipe(
      ofType(Login),
      exhaustMap(action => 
        auth.login(action).pipe(
          map(response => response.code === 200 ? LoginSuccess(response) : LoginErrored(response)),
          catchError(e => of(LoginErrored({ code: 400, token: null, message: e.message }))),
        ),
      ),
    );
  }, 
  { functional: true },
);

export const createAccount$ = createEffect(
  (actions$ = inject(Actions), auth = inject(AuthService)) => {
    return actions$.pipe(
      ofType(CreateAccount),
      exhaustMap(action => 
        auth.createAccount(action).pipe(
          map(response => response.code === 200 ? CreateAccountSuccess(response) : CreateAccountErrored(response)),
          catchError(e => of(CreateAccountErrored({ code: 400, token: null, message: e.message }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const saveToken$ = createEffect(
  (actions$ = inject(Actions), auth = inject(AuthService), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(LoginSuccess, CreateAccountSuccess),
      switchMap(action => {
        auth.saveToken(action.token);
        const { userId } = decode(action.type);
        return userService.findById(userId).pipe(
          map(user => SetUser({ user })),
        );
      }),
    );
  }, 
  { functional: true },
);

export const removeToken$ = createEffect(
  (actions$ = inject(Actions), auth = inject(AuthService)) => {
    return actions$.pipe(
      ofType(Logout),
      map(() => auth.removeToken()),
    );
  }, 
  { functional: true, dispatch: false },
);
