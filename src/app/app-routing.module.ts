import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './account/profile/profile.component';
import { MenuItemsComponent } from './menu-items/menu-items/menu-items.component';
import { RestaurantsComponent } from './restaurants/restaurants/restaurants.component'
import { RestaurantHomeComponent } from './restaurants/restaurant-home/restaurant-home.component'
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';

import { AuthenticationGuard } from './authentication.guard';
import { MenuItemComponent } from './menu-items/menu-item/menu-item.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: "full"
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: '',
        redirectTo: 'home',
        pathMatch: "full"
      },
      {
        path: 'restaurants/:id/menu-items',
        component: RestaurantHomeComponent
      },
      {
        path: 'restaurants',
        component: RestaurantsComponent
      },
      {
        path: 'search/menu-items',
        component: RestaurantsComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'account/profile',
        component: ProfileComponent
      }
    ],
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }