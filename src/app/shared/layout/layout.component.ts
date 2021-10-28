import { Component, ChangeDetectorRef, Input, AfterContentChecked, ViewChild, TemplateRef, ElementRef, SimpleChange, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { map, shareReplay } from 'rxjs/operators';
import { OrderService } from 'src/app/core/services/order.service'
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/core/entities/customer';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from 'src/app/core/entities/order';
import { MatDialog } from '@angular/material/dialog';
import { UpdateOrderDto } from 'src/app/core/entities/updateOrderDto';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Menuitem } from 'src/app/core/entities/menuitem';
import { MenuitemModalComponent } from 'src/app/views/menu-items-view/menu-items/menu-item-modal/menu-item-modal.component';
import { MenuitemOrder } from 'src/app/core/entities/menuitemOrder';

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



    ngOnInit(): void {

    }

    ngAfterContentChecked() {
        this.ref.detectChanges();
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


    logout() {
        console.log("LOGOUT")
        this.authService.logout();
    }
}


