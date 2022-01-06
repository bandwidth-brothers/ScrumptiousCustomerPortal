import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Restaurant } from 'src/app/core/entities/restaurant';
import { OrderService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/core/entities/order';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant;
  @Input() order: Order | undefined;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) {
  }

  goToRestaurant() {
    console.log("goToRestaurant called");
    if (this.orderService.currentOrder && this.restaurant.id) {
      // if you are changing to a new restaurant then all menuitemOrders must go away
      if (this.orderService.currentOrder.restaurant?.id !== this.restaurant.id) {
        this.orderService.removeAllMenuitemsFromOrder(this.orderService.currentOrder.id).subscribe(() =>
          this.orderService.currentOrder?.menuitemOrders.splice(0, this.orderService.currentOrder.menuitemOrders.length));
      }
      this.orderService.currentOrder.restaurant = this.restaurant;
      this.orderService.updateOrderRestaurant(this.orderService.currentOrder.id, this.restaurant.id, true).subscribe(() =>
        this.router.navigate(["restaurants/" + this.restaurant.id + '/menu-items']));
    }




  }
}