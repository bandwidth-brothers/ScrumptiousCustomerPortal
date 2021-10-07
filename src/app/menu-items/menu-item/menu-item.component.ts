import { Component, OnInit, Input } from '@angular/core';

import { Menuitem } from 'src/app/entities/menuitem';
import { Restaurant } from 'src/app/entities/restaurant'
import { Address } from 'src/app/entities/address'

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuitemComponent implements OnInit {
  @Input() menuitem!: Menuitem
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
