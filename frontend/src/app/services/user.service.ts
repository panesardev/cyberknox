import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../types/user.interface';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  findById(id: User['id']): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }
}
