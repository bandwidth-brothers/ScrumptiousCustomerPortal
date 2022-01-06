import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateCartModalComponent } from '../update-cart-modal/update-cart-modal.component';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Order } from '../../../../core/entities/order';
import { UpdateOrderDto } from '../../../../core/entities/updateOrderDto';
import { OrderService } from 'src/app/core/services/order.service';

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
    private notificationService: NotificationService,
    private dialog: MatDialog
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
    } else {
      this.notificationService.openSnackBar("Order cannot be cancelled")
    }
  }

  editOrder(order: Order) {
    if (this.isCancellable(order)) {
      const dialogRef = this.dialog.open(UpdateCartModalComponent, {
        id: 'dialog1',
        panelClass: 'custom-side-dialog-container',
        backdropClass: 'custom-side-backdrop',
        height: "calc(100% - 64px)",
        width: "15%",
        position: {
          right: "0%",
          top: "0%"
        },
        data: {
          order: order
        }
      })
      console.log(order)
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dataSource = this.dataSource?.map(order => {
            return order.id === result.id ? result : order
          })
        }
      });
    } else {
      this.notificationService.openSnackBar("Order cannot be edited")
    }

  }

}
