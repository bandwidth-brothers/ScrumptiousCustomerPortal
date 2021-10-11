import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth-interceptor.service';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RestaurantsComponent } from './restaurants/restaurants/restaurants.component';
import { RestaurantCardComponent } from './restaurants/restaurant-card/restaurant-card.component';
import { RestaurantHomeComponent } from './restaurants/restaurant-home/restaurant-home.component';
import { MenuItemsComponent } from './menu-items/menu-items/menu-items.component';
import { MenuItemComponent } from './menu-items/menu-item/menu-item.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { LoggerModule } from 'ngx-logger';
import { LoginComponent } from './auth/login/login.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { ProfileDetailsComponent } from './account/profile-details/profile-details.component';
import { ProfileComponent } from './account/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MenuItemService } from './core/services/menu-item.service';
import { RestaurantService } from './core/services/restaurant.service';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskModule } from 'ngx-mask';
import { SortByPricePipe } from './pipes/sort-by-price.pipe';
import { SortByRatingPipe } from './pipes/sort-by-rating.pipe';
import { SortByDistancePipe } from './pipes/sort-by-distance.pipe';
import { StarRatingComponent } from './util/star-rating/star-rating.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ProfileDetailsComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantCardComponent,
    RestaurantHomeComponent,
    MenuItemsComponent,
    MenuItemComponent,
    SortByPricePipe,
    SortByRatingPipe,
    SortByDistancePipe,
    StarRatingComponent
  ],
  imports: [
    MatGridListModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    CustomMaterialModule.forRoot(),
    AppRoutingModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `http://my-api/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    NgxMaskModule.forRoot()
  ],
  providers: [AuthInterceptor, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
