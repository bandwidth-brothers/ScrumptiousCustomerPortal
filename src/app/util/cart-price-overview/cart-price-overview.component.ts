import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MenuitemOrder } from "src/app/entities/menuitemOrder";

@Component({
  selector: 'app-cart-price-overview',
  templateUrl: './cart-price-overview.component.html',
  styleUrls: ['./cart-price-overview.component.css']
})
export class CartPriceOverviewComponent implements OnInit {

  @Input() itemOrders!: MenuitemOrder[];
  subtotal: number = 0;
  deliveryFee!: number;
  feeTax!: number;
  total!: number;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("CHANGE")
    this.subtotal = 0
    for (let item of changes.itemOrders.currentValue) {
      this.subtotal += (item.quantity * item.menuitem.price)
    }

    this.deliveryFee = 0.1 * this.subtotal;

    this.feeTax = 0.1 * this.subtotal + 0.06625 * (this.deliveryFee + this.subtotal)

    this.total = this.feeTax + this.deliveryFee + this.subtotal
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values

  }
}
