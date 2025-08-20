import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, user);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, user);
  }

  refresh(username: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/refresh`, {"username": username});
  }
}
