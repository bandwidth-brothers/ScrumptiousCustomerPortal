import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const bearer = this.authService.token;
    if (request.headers.get('skip-auth') === 'true') {
      request = request.clone({
        headers: request.headers.delete('skip')
      });
      return next.handle(request);
    } else if (bearer) {

      const authedReq = request.clone({
        headers: request.headers.set('Authorization', bearer),
      });
      return next.handle(authedReq);
    } else {
      return next.handle(request);
    }
  }
}