import { Component, OnInit, Input } from '@angular/core';

import { MenuItem } from 'src/app/Interfaces/MenuItem';
import { Restaurant } from 'src/app/Interfaces/Restaurant'
import { Address } from 'src/app/Interfaces/Address'

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem!: MenuItem
  restaurant!: Restaurant
  restaurantAddress!: Address
  foodPicture: string = "assets/images/food-img.jpg";

  constructor() { }

  ngOnInit(): void {
    this.restaurant = this.menuItem.restaurant
    this.restaurantAddress = this.restaurant.address
  }

}
