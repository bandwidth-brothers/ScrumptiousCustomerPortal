import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjJAYS5jb20iLCJVc2VySWQiOiIzMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJBdXRob3JpdGllcyI6IlJPTEVfQURNSU4iLCJleHAiOjE2MzE4MzE3NDR9.oFwaTzfC5dEsx9dvo180riEHq3uJ4tB255thLRvMZnSFFzdsheQzOdWNZgzg486aTK5sA1YsBKzdu9rVb4-Vig';//localStorage.getItem("id_token");

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
