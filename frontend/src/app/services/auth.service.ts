import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { AuthResponse, CreateAccountRequestBody, LoginRequestBody } from '../types/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    else return null;
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
