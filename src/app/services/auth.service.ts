import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('isLogged'));
  isLoggedIn$ = this.loggedIn.asObservable();

  login(token: string, username: string, role: string): void {
    const expirationTime = new Date().getTime() + 60 * 60 * 1000;
    localStorage.setItem('jwt', token);
    localStorage.setItem('isLogged', username);
    localStorage.setItem('role', role);
    localStorage.setItem('expirationTime', expirationTime.toString());
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLogged');
    localStorage.removeItem('role');
    localStorage.removeItem('expirationTime')
    this.loggedIn.next(false);
  }
}
