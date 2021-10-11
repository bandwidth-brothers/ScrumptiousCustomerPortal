import { Component, ChangeDetectorRef, Input, AfterContentChecked } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { AuthService } from './../../core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { map, shareReplay } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/entities/customer';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from 'src/app/entities/order';
import { MatDialog } from '@angular/material/dialog';
import { UpdateOrderDto } from 'src/app/entities/updateOrderDto';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Menuitem } from 'src/app/entities/menuitem';
import { MenuitemModalComponent } from 'src/app/menu-items/menuitem-modal/menuitem-modal.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterContentChecked {


    showSpinner!: boolean;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );
    @Input() customer: Customer | undefined;
    @Input() error: HttpErrorResponse | undefined;
    @Input() order: Order | undefined;
    @Input() quantity!: number;

    constructor(
        public spinnerService: SpinnerService,
        public dialog: MatDialog,
        private notificationService: NotificationService,
        private breakpointObserver: BreakpointObserver,
        private ref: ChangeDetectorRef,
        private orderService: OrderService,
        private authService: AuthService,
        private customerService: CustomerService) {

        const id = this.authService.userId;

        if (!id) {
            //todo navigate to login
        } else {
            this.customerService.getCustomer(id).subscribe((myCustomer) => this.setCustomer(myCustomer));

        }

    }

    ngAfterContentChecked() {
        this.ref.detectChanges();
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

    checkIsError(returnedValue: any): returnedValue is HttpErrorResponse {
        return (returnedValue as HttpErrorResponse).status !== undefined;
    }
    checkIsValidCustomer(returnedValue: Customer | HttpErrorResponse | undefined): returnedValue is Customer {
        //try to cast it to a Customer and check its firstName to see if it's actually a customer
        return (returnedValue as Customer).firstName !== undefined;
    }

    placeOrder() {
        console.log("order placed");
        if (this.order) {
            var currentDate = new Date();
            var requestedDate = new Date();
            requestedDate.setHours(currentDate.getHours() + 1);

            const updateOrderDto: UpdateOrderDto = {
                id: this.order.id,
                restaurantId: this.order.restaurant.id,
                customerId: this.order.customer.id,
                confirmationCode: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                preparationStatus: "Placed",
                submittedAt: currentDate.toISOString(),
                requestedDeliveryTime: requestedDate.toISOString(),
                // could set orderDiscount here depending on this.order.customer.dob
            }
            this.orderService.updateOrder(updateOrderDto).subscribe(() => {

                if (this.orderService.customerOrders) {
                    this.setCustomer(this.customer as Customer);
                    this.notificationService.openSnackBar("Order successfully placed");
                }
            });
        }
    }

    removeMenuitemOrder(orderId: number, menuitemId: number) {
        this.orderService.removeMenuitemFromOrder(orderId, menuitemId).subscribe(() => {
            if (this.orderService.currentOrder) {
                this.orderService.currentOrder.menuitemOrders = this.orderService.currentOrder.menuitemOrders.filter(p => p.menuitem.id !== menuitemId);
            }
        });
    }

    editMenuitemOrder(menuitem: Menuitem) {
        const dialogRef = this.dialog.open(MenuitemModalComponent, {
            width: '250px',
            data: { menuitem: menuitem, quantity: this.quantity }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.quantity = result;
                this.addMenuitem(menuitem);
            }


        });
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


