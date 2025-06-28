import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt');
    const expiration = localStorage.getItem('expirationTime');
    const isLoginRequest = request.url.endsWith('/auth/login');

    const now = new Date().getTime();
    if (!isLoginRequest && token && expiration && now < +expiration) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else if (expiration && now >= +expiration) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('isLogged');
      localStorage.removeItem('role');
      localStorage.removeItem('expirationTime');
    }

    return next.handle(request);

    if (!isLoginRequest && token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
