import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuitemModalComponent } from 'src/app/views/menu-items-view/menu-item-modal/menu-item-modal.component';
import { Customer } from '../../entities/customer';
import { Menuitem } from '../../entities/menuitem';
import { MenuitemOrder } from '../../entities/menuitemOrder';
import { Order } from '../../entities/order';
import { UpdateOrderDto } from '../../entities/updateOrderDto';
import { NotificationService } from '../../services/notification.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-right-drawer-current-order',
  templateUrl: './right-drawer-current-order.component.html',
  styleUrls: ['./right-drawer-current-order.component.css']
})
export class RightDrawerCurrentOrderComponent implements OnInit {
  @Input() order!: Order | undefined;
  @Input() customer: Customer | undefined;
  @Input() error: HttpErrorResponse | undefined;
  @Input() quantity!: number;
  subtotal: number = 0;
  deliveryFee!: number;
  feeTax!: number;
  total!: number;
  selectedValue: string = "";
  timeSlots: string[] = []

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private notificationService: NotificationService,) { }

  ngOnInit(): void {
    const newUpdateReqTime: Date = new Date()
    newUpdateReqTime.setHours(1 + newUpdateReqTime.getHours() + Math.floor(newUpdateReqTime.getMinutes() / 60))
    this.selectedValue = newUpdateReqTime.toISOString()
    this.timeSlots.push(newUpdateReqTime.toISOString())
    console.log(newUpdateReqTime)
    for (let i = 0; i < 10; i++) {
      newUpdateReqTime.setHours(1 + newUpdateReqTime.getHours() + Math.floor(newUpdateReqTime.getMinutes() / 60))
      newUpdateReqTime.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
      this.timeSlots.push(newUpdateReqTime.toISOString())
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes.order && changes.order.currentValue) {
      this.changePrices(changes.order.currentValue)
      // You can also use categoryId.previousValue and 
      // categoryId.firstChange for comparing old and new values
    }
  }

  changePrices(order: any) {
    this.subtotal = 0
    for (let item of order.menuitemOrders) {
      this.subtotal += (item.quantity * item.menuitem.price)
    }

    this.deliveryFee = 0.1 * this.subtotal;

    this.feeTax = 0.1 * this.subtotal + 0.06625 * (this.deliveryFee + this.subtotal)

    this.total = this.feeTax + this.deliveryFee + this.subtotal
  }

  async getOrder(orders: Order[]) {
    if (this.customer) {
      const customerId = this.customer.id;
      // if a current order does not currently exist
      if (!orders || orders[orders.length - 1].confirmationCode) {

        // create a new order
        this.orderService.createOrder(this.customer.id).subscribe(
          () => {
            // createOrder returns a location header, which i don't know how to access
            // so we have to get all orders by customer again to see the new one
            this.orderService.getOrdersByCustomerId(customerId).subscribe(orders => {

              this.orderService.currentOrder = orders[orders.length - 1];
              this.order = this.orderService.currentOrder;

            });
          })
      } else {
        this.orderService.currentOrder = orders[orders.length - 1];
        this.order = this.orderService.currentOrder;
      }
    }
  }

  async setCustomer(response: Customer | HttpErrorResponse) {
    if (this.checkIsValidCustomer(response)) {
      this.customer = response;
      // this is to ensure that this.orderService.currentOrder has a value
      this.orderService.getOrdersByCustomerId(this.customer.id).subscribe((o) => {
        this.getOrder(o);
      });


    } else if (this.checkIsError(response)) {
      this.error = response;
    }
  }

  checkIsError(returnedValue: any): returnedValue is HttpErrorResponse {
    return (returnedValue as HttpErrorResponse).status !== undefined;
  }
  checkIsValidCustomer(returnedValue: Customer | HttpErrorResponse | undefined): returnedValue is Customer {
    //try to cast it to a Customer and check its firstName to see if it's actually a customer
    return (returnedValue as Customer).firstName !== undefined;
  }

  placeOrder() {
    console.log("order placed");
    console.log(this.order)
    if (this.order) {
      if (this.order.restaurant) {
        const updateOrderDto: UpdateOrderDto = {
          id: this.order.id,
          restaurantId: this.order.restaurant.id,
          customerId: this.order.customer.id,
          confirmationCode: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          preparationStatus: "Order Placed",
          submittedAt: new Date().toISOString(),
          requestedDeliveryTime: new Date(Date.parse(this.selectedValue)).toISOString(),
          // could set orderDiscount here depending on this.order.customer.dob
        }
        this.orderService.updateOrder(updateOrderDto).subscribe(() => {

          if (this.orderService.customerOrders) {
            this.setCustomer(this.customer as Customer);
            this.notificationService.openSnackBar("Order successfully placed");
          }
        });
      } else {

      }
    }
  }

  async removeMenuitemOrder(orderId: number, menuitemId: number) {
    this.orderService.removeMenuitemFromOrder(orderId, menuitemId).subscribe(() => {
      if (this.orderService.currentOrder) {
        this.orderService.currentOrder.menuitemOrders = this.orderService.currentOrder.menuitemOrders.filter(p => p.menuitem.id !== menuitemId);
      }
    });
  }

  editMenuitemOrder(menuitemOrder: MenuitemOrder) {
    this.quantity = menuitemOrder.quantity;
    const dialogRef = this.dialog.open(MenuitemModalComponent, {
      width: '250px',
      data: { menuitem: menuitemOrder.menuitem, quantity: this.quantity }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quantity = result;
        this.addMenuitem(menuitemOrder.menuitem);
      }


    });
  }

  editRequestTime(selectedValue: string) {
    //this.tempOrder.requestedDeliveryTime = new Date(Date.parse(selectedValue));
  }

  async addMenuitem(menuitem: Menuitem) {
    // ugly code to add a menu item to the current order, will also update layout component with new values
    if (this.orderService.currentOrder) {
      this.orderService.addMenuitemToOrder(this.orderService.currentOrder.id, menuitem.id, this.quantity).subscribe(() => {
        this.notificationService.openSnackBar(menuitem.name + " (" + this.quantity + ") added to order");
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
