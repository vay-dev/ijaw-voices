import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

// Variables to manage the refresh state
let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
  null
);

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('access_token');

  // 1. Define excluded routes
  const excludedUrls = ['/login', '/signup', '/logout', '/refresh'];
  const isExcluded = excludedUrls.some((url) => req.url.includes(url));

  // 2. Attach token if available and not excluded
  let authReq = req;
  if (token && !isExcluded) {
    authReq = addTokenHeader(req, token);
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 3. Handle 401 Unauthorized
      if (error instanceof HttpErrorResponse && error.status === 401 && !isExcluded) {
        return handle401Error(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

// Helper to clone request with header
function addTokenHeader(request: HttpRequest<unknown>, token: string) {
  return request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
}

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<any> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((newToken: string) => {
        isRefreshing = false;
        refreshTokenSubject.next(newToken); // Release the "lock" and send the new token to waiters
        return next(addTokenHeader(request, newToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        const refreshToken: string | null = authService.getRefreshToken();
        if (refreshToken) {
          authService.logout(refreshToken);
        }

        return throwError(() => err);
      })
    );
  } else {
    // 4. If already refreshing, wait for the refreshTokenSubject to emit a value
    return refreshTokenSubject.pipe(
      filter((token) => token !== null), // Only proceed when we have a new token
      take(1), // Complete the stream after one emission
      switchMap((token) => next(addTokenHeader(request, token!)))
    );
  }
}
