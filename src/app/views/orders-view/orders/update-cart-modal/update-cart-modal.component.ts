import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { Order } from '../../../../core/entities/order';
import { Menuitem } from 'src/app/core/entities/menuitem';
import { MenuitemOrder } from '../../../../core/entities/menuitemOrder';
import { MenuitemModalComponent } from '../../../menu-items-view/menu-item-modal/menu-item-modal.component';
import { OrderService } from 'src/app/core/services/order.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UpdateOrderDto } from 'src/app/core/entities/updateOrderDto';
import { UpdateMenuitemOrder, MenuitemToUpdateMenuitemOrder } from '../../../../core/entities/updateMenuitemOrder';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-cart-modal',
  templateUrl: './update-cart-modal.component.html',
  styleUrls: ['./update-cart-modal.component.css']
})
export class UpdateCartModalComponent implements OnInit {
  @Input() quantity!: number
  updated: boolean = false
  tempOrder!: Order;
  selectedValue: string = "";
  timeSlots: string[] = []

  constructor(
    public dialogRef: MatDialogRef<UpdateCartModalComponent>,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order }
  ) { }

  ngOnInit(): void {
    this.tempOrder = JSON.parse(JSON.stringify(this.data.order))
    console.log(typeof (this.tempOrder.requestedDeliveryTime))
    console.log(typeof (new Date()))
    const c = new Date()
    this.selectedValue = this.tempOrder.requestedDeliveryTime.toString()
    this.timeSlots.push(this.tempOrder.requestedDeliveryTime.toString())
    const newUpdateReqTime: Date = new Date()
    console.log(newUpdateReqTime)
    for (let i = 0; i < 10; i++) {
      newUpdateReqTime.setHours(1 + newUpdateReqTime.getHours() + Math.floor(newUpdateReqTime.getMinutes() / 60))
      newUpdateReqTime.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
      this.timeSlots.push(newUpdateReqTime.toISOString())
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isCancellable(order: Order): boolean {
    // can put more here as preparationStatus gets more defined
    if (order.preparationStatus !== "Cancelled" && order.preparationStatus !== "Not placed") {
      if (order.requestedDeliveryTime) {
        const currentDate = new Date();
        const requestedDate = new Date(order.requestedDeliveryTime);
        var diff = (requestedDate.getTime() - currentDate.getTime()) / 1000;
        diff /= 60;
        // diff is now the difference in times in minutes
        return (diff > 30);
      }
    }
    return false;
  }

  removeMenuitemOrder(menuitemOrder: MenuitemOrder) {
    menuitemOrder.quantity = 0
    this.updated = true
    this.tempOrder.menuitemOrders = this.tempOrder.menuitemOrders.map(item => {
      return item.menuitem.id === menuitemOrder.menuitem.id ? menuitemOrder : item
    })
  }

  editMenuitemOrder(menuitemOrder: MenuitemOrder) {
    console.log(this.tempOrder.menuitemOrders)
    this.quantity = menuitemOrder.quantity;
    const dialogRef = this.dialog.open(MenuitemModalComponent, {
      width: '250px',
      data: { menuitem: menuitemOrder.menuitem, quantity: this.quantity }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.quantity != result) {
          this.updated = true
        }
        menuitemOrder.quantity = result
        this.tempOrder.menuitemOrders = this.tempOrder.menuitemOrders.map(item => {
          return item.menuitem.id === menuitemOrder.menuitem.id ? menuitemOrder : item
        })
      }
      console.log(this.tempOrder.menuitemOrders)
    });
  }

  editRequestTime(selectedValue: string) {
    if (this.tempOrder.requestedDeliveryTime !== new Date(Date.parse(selectedValue))) {
      this.updated = true
    }
    console.log("EDITED")
    this.tempOrder.requestedDeliveryTime = new Date(Date.parse(selectedValue));
  }

  async submitUpdateOrder() {
    if (this.isCancellable(this.tempOrder)) {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        id: 'dialog2',
        data: { title: 'Confirmation', message: 'Are you sure you want to update your order?' }
      })

      confirmDialog.afterClosed().subscribe(result => {
        if (result) {
          var currentDate = new Date();
          var requestedDate = new Date();
          requestedDate.setHours(currentDate.getHours() + 1);

          //console.log(this.tempOrder.menuitemOrders)
          const filteredMenuitems = this.tempOrder.menuitemOrders.filter(item => {
            if (item.quantity === 0) {
              const response = this.orderService.removeMenuitemFromOrder(this.tempOrder.id, item.menuitem.id).subscribe()
              return false
            } else {
              return true
            }
          })
          //console.log(filteredMenuitems)
          this.tempOrder.menuitemOrders = filteredMenuitems
          this.tempOrder.preparationStatus = "Order Placed"
          const menuitemOrder: UpdateMenuitemOrder[] = filteredMenuitems.map(item => {
            return MenuitemToUpdateMenuitemOrder(item)
          })

          //console.log(menuitemOrder)
          const updateOrderDto: UpdateOrderDto = {
            id: this.tempOrder.id,
            restaurantId: this.tempOrder.restaurant.id,
            customerId: this.tempOrder.customer.id,
            confirmationCode: this.tempOrder.confirmationCode,
            preparationStatus: this.tempOrder.preparationStatus,
            submittedAt: currentDate.toISOString(),
            requestedDeliveryTime: this.tempOrder.requestedDeliveryTime,
            orderDiscount: this.tempOrder.orderDiscount,
            menuitems: menuitemOrder
          }

          if (this.orderService.currentOrder) {
            this.orderService.updateOrder(updateOrderDto).subscribe(() => {
              this.notificationService.openSnackBar("Updated order");
              this.dialogRef.close(this.tempOrder)
            }
            )
          }
        }
      })
    } else {
      this.notificationService.openSnackBar("Order cannot be updated")
    }
  }
}
