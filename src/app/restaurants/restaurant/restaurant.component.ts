import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Restaurant } from 'src/app/Interfaces/Restaurant';
import { Address } from 'src/app/Interfaces/Address'

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant!: Restaurant
  restaurantAddress!: Address
  restaurantPicture: string = "assets/images/logo-template.jpg";

  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

  }

  goToRestaurant() {
    this.router.navigate([this.restaurant.id + '/menu-items'], {
      relativeTo: this.route,

    })
  }

}
