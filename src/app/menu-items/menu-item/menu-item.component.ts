import { Component, OnInit, Input } from '@angular/core';

import { MenuItem } from 'src/app/entities/menu-item';
import { Restaurant } from 'src/app/entities/restaurant'
import { Address } from 'src/app/entities/address'

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem!: MenuItem
  @Input() restaurant!: Restaurant
  restaurantAddress!: Address
  foodPicture: string = "assets/images/food-img.jpg";

  constructor() { }

  ngOnInit(): void {
    if (this.restaurant) {
      this.restaurantAddress = this.restaurant.address
    }
  }

}
