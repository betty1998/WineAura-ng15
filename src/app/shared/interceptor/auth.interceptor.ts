import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token;
    if(request.url.includes('admin')){
      token = localStorage.getItem("adminToken");
    }else {
      token = localStorage.getItem("customerToken");
    }
    if (token){
      request = request.clone({
        setHeaders:{
          authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
