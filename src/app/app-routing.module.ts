import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './account/profile/profile.component';
import { MenuItemsComponent } from './menu-items/menu-items/menu-items.component';
import { LoginComponent } from './auth/login/login.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';

import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
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
        component: LoginComponent,
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
        component: MenuItemsComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'account/profile',
        component: ProfileComponent
      },
      {
        path: 'customers',
        component: CustomerProfileComponent
      },
      {
        path: 'customers/:id',
        component: CustomerProfileComponent
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
