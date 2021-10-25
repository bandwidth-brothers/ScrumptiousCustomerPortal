import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';

import { Menuitem } from 'src/app/entities/menuitem';
import { Restaurant } from 'src/app/entities/restaurant'
import { Address } from 'src/app/entities/address'
import { MatDialog } from '@angular/material/dialog';
import { MenuitemModalComponent } from '../menuitem-modal/menuitem-modal.component';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/entities/order';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Subscription } from 'rxjs';


export interface MenuitemData {
  menuitem: Menuitem;
  quantity: number;
}
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuitemComponent implements OnInit {
  @Input() menuitem!: Menuitem
  @Input() restaurant!: Restaurant
  @Input() order: Order | any;

  quantity!: number;

  constructor(public dialog: MatDialog,
    private orderService: OrderService,
    private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    if (this.restaurant) {
      this.menuitem.restaurant = this.restaurant;
    }

  }

  openModal() {
    this.quantity = 1;
    const dialogRef = this.dialog.open(MenuitemModalComponent, {
      width: '250px',
      data: { menuitem: this.menuitem, quantity: this.quantity }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quantity = result;
        this.addMenuitem();
      }


    });
  }

  async addMenuitem() {
    // ugly code to add a menu item to the current order, will also update layout component with new values
    if (this.orderService.currentOrder) {
      this.orderService.addMenuitemToOrder(this.orderService.currentOrder.id, this.menuitem.id, this.quantity).subscribe(() => {
        this.notificationService.openSnackBar(this.menuitem.name + " (" + this.quantity + ") added to order");
        if (this.orderService.currentOrder) {

          this.orderService.getOrderById(this.orderService.currentOrder.id).subscribe((o) => {
            if (this.orderService.currentOrder)
              this.orderService.currentOrder.menuitemOrders = (o as Order).menuitemOrders;
          }
          )
        }
      }
      )

    }
  }

}
