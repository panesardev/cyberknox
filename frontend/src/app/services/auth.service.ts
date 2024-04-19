import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { AuthResponse, CreateAccountRequestBody, LoginRequestBody } from '../types/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(body: LoginRequestBody): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, body);
  }

  createAccount(body: CreateAccountRequestBody): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/create-account`, body);
  }

  logout(): void {
    this.removeToken();
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}
