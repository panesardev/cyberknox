import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable, signal } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { catchError, EMPTY, exhaustMap, tap } from 'rxjs';
import { API_URL } from '../app.constants';
import { AuthResponse, CreateAccountRequestBody, decode, LoginRequestBody } from '../types/auth.interface';
import { User } from '../types/user.interface';
import { LOCAL_STORAGE } from '../utilities/localstorage';
import { UserService } from './user.service';

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private localStorage = inject(LOCAL_STORAGE);
  private http = inject(HttpClient);
  private toast = inject(HotToastService);
  private userService = inject(UserService);

  private state = signal<AuthState>(initialState);

  authState = this.state.asReadonly();

  ref = afterNextRender(() => this.onAuthInit());

  onAuthInit() {
    this.state.update(v => ({ ...v, isLoading: true }));
    const token = this.getToken();
    if (token) {
      const { userId } = decode(token);
      this.userService.findById(userId).pipe(
        tap(httpResponse => this.state.update(v => ({ 
          ...v, 
          isLoading: false,
          isAuthenticated: true,
          token,
          user: httpResponse.payload,
        }))),
        catchError(e => {
          e.status === 403 && this.removeToken();
          return EMPTY;
        }),
      ).subscribe();
    }
    this.state.update(v => ({ ...v, isLoading: false }));
  }

  login(body: LoginRequestBody) {
    this.state.update(v => ({ ...v, isLoading: true }));
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, body).pipe(
      exhaustMap(response => {
        this.saveToken(response.token);
        this.toast.success('You are logged in!');
        const { userId } = decode(response.token);
        return this.userService.findById(userId).pipe(
          tap(httpResponse => this.state.update(v => ({ 
            ...v, 
            isLoading: false,
            isAuthenticated: true,
            token: response.token,
            user: httpResponse.payload,
          }))),
        );
      }),
      catchError(e => {
        this.toast.error(e.message);
        this.state.update(v => ({ ...v, isLoading: false }));
        return EMPTY;
      }),
    );
  }

  createAccount(body: CreateAccountRequestBody) {
    this.state.update(v => ({ ...v, isLoading: true }));
    return this.http.post<AuthResponse>(`${API_URL}/auth/create-account`, body).pipe(
      exhaustMap(response => {
        this.saveToken(response.token);
        this.toast.success('You are logged in!');
        const { userId } = decode(response.token);
        return this.userService.findById(userId).pipe(
          tap(httpResponse => this.state.update(v => ({ 
            ...v, 
            isLoading: false,
            isAuthenticated: true,
            token: response.token,
            user: httpResponse.payload,
          }))),
        );
      }),
      catchError(e => {
        this.toast.error(e.message);
        this.state.update(v => ({ ...v, isLoading: false }));
        return EMPTY;
      }),
    );
  }

  logout(): void {
    this.state.set(initialState);
    this.removeToken();
  }

  saveToken(token: string): void {
    this.localStorage.setItem('token', token);
    this.state.update(v => ({ ...v, token }));
  }

  getToken(): string {
    const token = this.localStorage.getItem('token');
    this.state.update(v => ({ ...v, token }));
    return token;
  }

  removeToken(): void {
    this.localStorage.removeItem('token');
    this.state.update(v => ({ ...v, token: null }));
  }
}
