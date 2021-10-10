import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Restaurant } from 'src/app/entities/restaurant';
import { Address } from 'src/app/entities/address'
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/entities/order';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant
  @Input() order: Order | undefined
  restaurantAddress!: Address
  restaurantPicture: string = "assets/images/logo-template.jpg";


  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) {
  }

  goToRestaurant() {
    if (this.orderService.currentOrder && this.restaurant.id) {
      this.orderService.currentOrder.restaurant = this.restaurant;
      this.orderService.updateOrderRestaurant(this.orderService.currentOrder.id, this.restaurant.id).subscribe(() =>
        this.router.navigate(["restaurants/" + this.restaurant.id + '/menu-items']));
    }
  }

}
