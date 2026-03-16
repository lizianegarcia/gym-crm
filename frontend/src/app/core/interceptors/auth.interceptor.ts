import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

const PUBLIC_ROUTES = ['/auth/login', '/auth/refresh']; // não anexar bearer aqui

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const auth = inject(AuthService);

  const isPublic = PUBLIC_ROUTES.some((p) => req.url.includes(p));
  const token = auth.getAccessToken();

  const reqWithAuth =
    !isPublic && token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(reqWithAuth).pipe(
    catchError((err: unknown) => {
      // Se deu 401 numa rota protegida, tenta refresh 1x
      if (err instanceof HttpErrorResponse && err.status === 401 && !isPublic) {
        return auth.refreshAccessToken().pipe(
          switchMap(() => {
            const newToken = auth.getAccessToken();
            if (!newToken) return throwError(() => err);

            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });

            return next(retryReq);
          }),
          catchError((refreshErr) => {
            // refresh falhou -> limpa sessão e devolve erro
            auth.logout();
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => err);
    })
  );
}
