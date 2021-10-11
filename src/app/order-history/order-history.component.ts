import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';
import { Order } from '../entities/order';
import { UpdateOrderDto } from '../entities/updateOrderDto';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OrderHistoryComponent {

  @Input() dataSource: Order[] | undefined;
  displayedColumns: string[] = ['Id', 'Restaurant', "Status", "ConfirmationCode", "SubmittedAt", "RequestedTime"];
  expandedOrder!: Order | null;
  foodPicture: string = "assets/images/food-img.jpg";


  constructor(private authService: AuthService, private orderService: OrderService,
    private notificationService: NotificationService
  ) {
    const customerId = this.authService.userId;
    if (customerId) {
      orderService.getOrdersByCustomerId(customerId).subscribe((orders) => {
        this.dataSource = orders.slice(0, orders.length - 1);

      });

    }
  }

  // determine if the order is more than 30 minutes out or has certain preparationStatuses
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

  cancelOrder(order: Order) {
    if (this.isCancellable(order)) {
      const updateOrderDto: UpdateOrderDto = {
        id: order.id,
        preparationStatus: "Cancelled",
      }
      this.orderService.updateOrder(updateOrderDto).subscribe(() => {
        if (this.authService.userId) {
          this.orderService.getOrdersByCustomerId(this.authService.userId).subscribe((orders) => {
            this.dataSource = orders.slice(0, orders.length - 1);
            this.notificationService.openSnackBar("Order cancelled")
          });
        }
      });
    }
    this.notificationService.openSnackBar("Order cannot be cancelled")
  }

}
