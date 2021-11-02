import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './orders/order-history/order-history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateCartModalComponent } from 'src/app/views/orders-view/orders/update-cart-modal/update-cart-modal.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { CheckoutComponent } from './orders/checkout/checkout.component';





@NgModule({
  declarations: [
    OrderHistoryComponent,
    UpdateCartModalComponent,
    CheckoutComponent

  ],
  imports: [
    CommonModule,
    SharedModule,


    OrdersRoutingModule
  ],
  exports: [
    OrderHistoryComponent,
    UpdateCartModalComponent,
    CheckoutComponent

  ]
})
export class OrdersViewModule { }
