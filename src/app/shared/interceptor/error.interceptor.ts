import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.error.message && error.error.message.startsWith("JWT expired")) {
          // remove expired token
          localStorage.removeItem('customerToken');

          // remove authentication header
          const cloneReq = request.clone({
            headers: request.headers.delete('Authorization')
          });
          return next.handle(cloneReq).pipe(retry(1));
        }
        // rethrow the error
        return throwError(() => error);
      })
    );
  }
}
