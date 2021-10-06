import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Restaurant } from 'src/app/entities/restaurant';
import { Address } from 'src/app/entities/address'

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {
  @Input() restaurant!: Restaurant
  restaurantAddress!: Address
  restaurantPicture: string = "assets/images/logo-template.jpg";

  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

  }

  goToRestaurant() {
    this.router.navigate(["restaurants/" + this.restaurant.id + '/menu-items'])
  }

}
