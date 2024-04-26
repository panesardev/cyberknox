import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { AuthResponse, CreateAccountRequestBody, LoginRequestBody } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(body: LoginRequestBody) {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, body);
  }
  
  createAccount(body: CreateAccountRequestBody) {
    return this.http.post<AuthResponse>(`${API_URL}/auth/create-account`, body);
  }

}
