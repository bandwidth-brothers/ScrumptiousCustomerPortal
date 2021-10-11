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
import { MenuitemsComponent } from './menu-items/menu-items/menu-items.component';
import { MenuitemComponent } from './menu-items/menu-item/menu-item.component';
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
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskModule } from 'ngx-mask';
import { RegisterComponent } from './auth/register/register.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MenuitemModalComponent } from './menu-items/menuitem-modal/menuitem-modal.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { SortByPricePipe } from './pipes/sort-by-price.pipe';
import { SortByRatingPipe } from './pipes/sort-by-rating.pipe';
import { SortByDistancePipe } from './pipes/sort-by-distance.pipe';
import { StarRatingComponent } from './util/star-rating/star-rating.component';
import { FilterByRatingPipe } from './pipes/filter-by-rating.pipe';
import { ToNumberPipe } from './pipes/to-number.pipe';
import { FilterByPriceCategoryPipe } from './pipes/filter-by-price-category.pipe';



@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ProfileDetailsComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantCardComponent,
    RestaurantHomeComponent,
    MenuitemsComponent,
    MenuitemComponent,
    MenuitemModalComponent,
    OrderHistoryComponent,
    MenuItemsComponent,
    MenuItemComponent,
    SortByPricePipe,
    SortByRatingPipe,
    SortByDistancePipe,
    StarRatingComponent,
    FilterByRatingPipe,
    ToNumberPipe,
    FilterByPriceCategoryPipe
  ],
  imports: [
    MatStepperModule,
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
