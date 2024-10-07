import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/feature-modules/user/user.service';
import { ACCESS_TOKEN } from '../../shared/constants';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === 401 &&
          !request.url.includes('/users/refresh-token')
        ) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const newAccessToken = localStorage.getItem(ACCESS_TOKEN);
              if (newAccessToken) {
                const newRequest = this.addToken(request, newAccessToken);
                return next.handle(newRequest);
              } else {
                return throwError('New access token not available');
              }
            }),
            catchError((refreshError) => {
              return throwError(refreshError);
            })
          );
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
