import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    // change this to your auth token if you want to run this for the time being
    const idToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhLmNvbSIsIlVzZXJJZCI6IjRjNTI4NTNiLTExNzgtMTFlYy1iZGNhLTJjNGQ1NGYxMjc2MCIsIkF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiIsImV4cCI6MTYzMjA2MjA3OH0.qQ3EOrDoTy8zmGx4dVGrPJWgXZ7SyHnYGSwXbgKlzxbD-e4p1FXt_ldrqWOpw_NVHTfeNwc5gwxKqa8JePSFvg';
    //localStorage.getItem("id_token");

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + idToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
