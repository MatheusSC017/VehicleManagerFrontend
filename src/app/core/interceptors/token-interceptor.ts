import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { throwError } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt');
    const expiration = localStorage.getItem('expirationTime');
    const isLoginRequest = request.url.endsWith('/auth/login');
    const isRefreshRequest = request.url.endsWith('/auth/refresh');

    const now = new Date().getTime();
    const THIRTY_MINUTES = 30 * 60 * 1000;

    if (token && expiration && !isLoginRequest) {
      const timeLeft = +expiration - now;
      
      if (timeLeft <= 0) {
        this.authService.logout();
        return throwError(() => new Error('Session expired'));
      }

      if (!isRefreshRequest && timeLeft <= THIRTY_MINUTES) {
        const username = localStorage.getItem('isLogged') || "";
        this.userService.refresh(username).subscribe({
          next: (response) => {
            const expirationTime = new Date().getTime() + 60 * 60 * 1000;
            localStorage.setItem('jwt', response.token);
            localStorage.setItem('expirationTime', expirationTime.toString());
          }
        });
      }

      request = this.addTokenHeader(request, token);
    }

    return next.handle(request);
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
