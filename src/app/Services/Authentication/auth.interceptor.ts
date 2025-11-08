import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  const newReqWithHeaders = token
    ? req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`),
      })
    : req;

  return next(newReqWithHeaders).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
        toast.info('Session expired. Please login again ', {
          description: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
      }
      return throwError(() => error);
    })
  );
};
