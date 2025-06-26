import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, user);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, user);
  }
}
