import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { AuthResponse, CreateAccountRequestBody, LoginRequestBody } from '../types/auth.interface';
import { LOCAL_STORAGE } from '../utilities/localstorage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private localStorage = inject(LOCAL_STORAGE);
  private http = inject(HttpClient);

  login(body: LoginRequestBody) {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, body);
  }
  
  createAccount(body: CreateAccountRequestBody) {
    return this.http.post<AuthResponse>(`${API_URL}/auth/create-account`, body);
  }

  saveToken(token: string): void {
    this.localStorage.setItem('token', token);
  }

  getToken(): string {
    return this.localStorage.getItem('token');
  }

  removeToken(): void {
    this.localStorage.removeItem('token');
  }
}
