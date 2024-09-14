import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401 || err.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '';
        }
        return throwError(() => err);
      })
    );
  }
}
