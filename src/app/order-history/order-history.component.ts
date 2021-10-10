import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../core/services/auth.service';
import { Order } from '../entities/order';
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

  @Input() orders: Order[] | undefined;
  dataSource: MatTableDataSource<Order> | undefined;
  displayedColumns: string[] = ['Id', 'Restaurant', "ConfirmationCode", "Discount"];
  expandedOrder!: Order | null;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private authService: AuthService, private orderService: OrderService
  ) {
    const customerId = this.authService.userId;
    if (customerId) {
      orderService.getOrdersByCustomerId(customerId).subscribe((order) => {
        this.orders = order;
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.dataSource.paginator = this.paginator;
      });

    }
  }


}
