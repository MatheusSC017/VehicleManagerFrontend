import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('isLogged'));
  isLoggedIn$ = this.loggedIn.asObservable();

  login(token: string, username: string): void {
    localStorage.setItem('jwt', token);
    localStorage.setItem('isLogged', username);
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLogged');
    this.loggedIn.next(false);
  }
}
