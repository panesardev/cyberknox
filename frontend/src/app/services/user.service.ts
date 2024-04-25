import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { HttpResponse } from '../types/http.interface';
import { User } from '../types/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  findById(id: User['id']): Observable<HttpResponse<User>> {
    return this.http.get<HttpResponse<User>>(`${API_URL}/users/${id}`);
  }

}
