import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Observable, Subscription } from 'rxjs';

import { environment } from './../../../environments/environment';
import { AuthService } from './../../core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent {


    showSpinner!: boolean;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        public spinnerService: SpinnerService,
        private breakpointObserver: BreakpointObserver
    ) {

    }




}
