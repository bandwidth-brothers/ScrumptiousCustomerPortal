import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(private spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get("skip") === 'true') {
            req = req.clone({
                headers: req.headers.delete('skip')
            });
            return next.handle(req);
        }

        req = req.clone({
            headers: req.headers.delete('skip')
        });
        this.spinnerService.show();

        return timer(500).pipe(switchMap(() => next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.spinnerService.hide();
            }
        }, (error) => {
            this.spinnerService.hide();
        }))))

    }
}
