import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule, MediaMatcher } from '@angular/cdk/layout';
import { NGXLogger } from 'ngx-logger';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { SpinnerInterceptor } from './interceptors/spinner-interceptor.service';
import { GlobalErrorHandler } from './services/globar-error.handler';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { LeftDrawerSidenavComponent } from './components/left-drawer-sidenav/left-drawer-sidenav.component';
import { RightDrawerCurrentOrderComponent } from './components/right-drawer-current-order/right-drawer-current-order.component';
import { CurrentOrderPriceOverviewComponent } from './components/right-drawer-current-order/current-order-price-overview/current-order-price-overview.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
  ],
  declarations: [

    HeaderComponent,
    LeftDrawerSidenavComponent,
    RightDrawerCurrentOrderComponent,
    CurrentOrderPriceOverviewComponent,

  ],
  providers: [
    MediaMatcher,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    { provide: NGXLogger, useClass: NGXLogger },
    { provide: 'LOCALSTORAGE', useValue: window.localStorage }
  ],
  exports: [
    HeaderComponent,
    LeftDrawerSidenavComponent,
    RightDrawerCurrentOrderComponent
  ]
})
export class CoreModule {
}
