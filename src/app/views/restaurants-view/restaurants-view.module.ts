import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantCardComponent } from './restaurants/restaurant-card/restaurant-card.component';
import { RestaurantListComponent } from './restaurants/restaurant-list/restaurant-list.component';
import { RestaurantHomeComponent } from './restaurants/restaurant-home/restaurant-home.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { MenuItemsViewModule } from '../menu-items-view/menu-items-view.module';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    RestaurantCardComponent,
    RestaurantHomeComponent,
    RestaurantListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MenuItemsViewModule,

    MatFormFieldModule,
    MatInputModule,

    RestaurantsRoutingModule
  ],
  exports: [
    RestaurantCardComponent,
    RestaurantHomeComponent,
    RestaurantListComponent
  ]
})
export class RestaurantsViewModule { }
