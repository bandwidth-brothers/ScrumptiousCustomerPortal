import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantHomeComponent } from './restaurants/restaurant-home/restaurant-home.component';

import { RestaurantListComponent } from './restaurants/restaurant-list/restaurant-list.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantListComponent
  },
  {
    path: ':id/menu-items',
    component: RestaurantHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }