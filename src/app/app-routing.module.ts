import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth-view/login/login.component';
import { RegisterComponent } from './views/auth-view/register/register.component';
import { HomeComponent } from './views/dashboard-view/dashboard-components/home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';

import { AuthenticationGuard } from './core/guards/authentication.guard';
import { LoggedAuthGuard } from './core/guards/logged-auth.guard';
import { CheckoutComponent } from './views/orders-view/orders/checkout/checkout.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: "full"
  },
  {
    path: 'auth',
    canLoad: [LoggedAuthGuard],
    canActivate: [LoggedAuthGuard],
    loadChildren: () => import('src/app/views/auth-view/auth-view.module').then(m => m.AuthViewModule)
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
        path: 'restaurants',
        loadChildren: () => import('src/app/views/restaurants-view/restaurants-view.module').then(m => m.RestaurantsViewModule)
      },
      {
        path: 'home',
        loadChildren: () => import('src/app/views/dashboard-view/dashboard-view.module').then(m => m.DashboardViewModule)
      },
      {
        path: 'account',
        loadChildren: () => import('src/app/views/settings-view/settings-view.module').then(m => m.SettingsViewModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('src/app/views/orders-view/orders-view.module').then(m => m.OrdersViewModule)
      },
      {
        path: 'order/checkout',
        component: CheckoutComponent
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