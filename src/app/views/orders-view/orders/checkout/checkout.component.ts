import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { OrderService } from 'src/app/core/services/order.service'

import { UpdateOrderDto } from 'src/app/core/entities/updateOrderDto'
import { OrderMessageDto } from 'src/app/core/entities/OrderMessageDto'

declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // order: Order | undefined;
  @Output() onChange = new EventEmitter<any>();
  paymentHandler: any = null;
  checkoutForm: FormGroup = new FormGroup({
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  selectedValue: string = "";
  timeSlots: string[] = []

  constructor(private customerService: CustomerService,
    private notificationService: NotificationService,
    private route: ActivatedRoute, public orderService: OrderService, private router: Router) { }

  ngOnInit() {

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

    console.log(this.orderService.currentOrder);
    // Your Stripe public key
    const stripe = Stripe('pk_test_51JjnQuJMHW5DMjis6yBh6Z0cEmyjv0PTQIAxc671ggRJ1c6llrSekoQbBzvLZxTMFvbcxh88cQpEQGuQcGTLtJz300xqC4wzMc');

    const style = {
      // hidePostalCode: true,
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '32px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    const elements = stripe.elements();
    const card = elements.create('card', style);
    card.mount('#card-element');
    card.addEventListener('change', (event: any) => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError!.textContent = event.error.message;
      } else {
        displayError!.textContent = '';
      }
    });


    // Listen for form submission, process the form with Stripe,
    // and get the 
    const paymentForm = document.getElementById('payment-form');
    paymentForm!.addEventListener('submit', event => {
      event.preventDefault();

      stripe.createToken(card).then((result: any) => {
        if (result.error) {
          console.log('Error creating payment method.');
          const errorElement = document.getElementById('card-errors');
          errorElement!.textContent = result.error.message;
        } else {
          // At this point, you should send the token ID
          // to your server so it can attach
          // the payment source to a customer
          console.log('Token acquired!');
          this.paymentCall(result.token.id);
        }
      });
    });
  }

  editRequestTime(selectedValue: string) {
    //this.tempOrder.requestedDeliveryTime = new Date(Date.parse(selectedValue));
  }

  paymentCall(token: String) {
    console.log("payment called");
    this.orderService.chargeOrder(token, this.orderService.currentOrder?.id).subscribe((result) => {
      if (result !== "") {
        this.placeOrder()
        this.orderService.paidCheck(true);
        this.router.navigate(['orders/history']);
      } else {
        console.log("payment failed");
        this.notificationService.openSnackBar("payment failed");
      }


    });;
  }

  placeOrder() {
    console.log("order placed");
    console.log(this.orderService.currentOrder)
    if (this.orderService.currentOrder) {
      if (this.orderService.currentOrder.restaurant) {
        const updateOrderDto: UpdateOrderDto = {
          id: this.orderService.currentOrder.id,
          restaurantId: this.orderService.currentOrder.restaurant.id,
          customerId: this.orderService.currentOrder.customer.id,
          confirmationCode: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          preparationStatus: "Order Placed",
          submittedAt: new Date().toISOString(),
          requestedDeliveryTime: this.orderService.currentOrder.requestedDeliveryTime.toISOString(),
          // could set orderDiscount here depending on this.order.customer.dob
        }
        this.orderService.updateOrder(updateOrderDto).subscribe(() => {

          if (this.orderService.customerOrders) {
            this.notificationService.openSnackBar("Order successfully placed");
            const orderMessageDto: OrderMessageDto = {
              customerName: this.orderService.currentOrder?.customer.firstName,
              customerPhoneNumber: this.orderService.currentOrder?.customer.phone,
              restaurantName: this.orderService.currentOrder?.restaurant.name,
              restaurantAddress: this.orderService.currentOrder?.restaurant.address.line1,
              confirmationCode: updateOrderDto.confirmationCode,
              preparationStatus: updateOrderDto.preparationStatus,
              requestedDeliveryTime: this.orderService.currentOrder?.requestedDeliveryTime.toISOString()

            }
            this.notificationService.sendTextMessageOrderConfirmation(orderMessageDto).subscribe(() => {

            })
          }
        });
      } else {

      }
    }
  }
  getTotalCost() {
    var x = this.orderService.currentOrder?.menuitemOrders.reduce((total, o) => o.menuitem.price * (1 - o.menuitem.discount) * o.quantity + total, 0);
    let discount = this.orderService.currentOrder?.orderDiscount;
    return x! * (1 - discount!);
  }

  getFullName() {
    return this.orderService.currentOrder?.customer.firstName + " " + this.orderService.currentOrder?.customer.lastName;
  }

  getDeliveryTime() {
    var currentDate = new Date();
    var requestedDate = new Date();
    requestedDate.setHours(currentDate.getHours() + 1)

    return this.orderService.currentOrder?.requestedDeliveryTime.toLocaleString();

  }

  getFullAddress() {
    var address = this.customerService.customerProfile?.address;
    return address?.line1 + ", " + (address?.line2 ? address?.line2 + ", " : "") + " " + address?.city + " " + address?.state + ", " + address?.zip;
  }

}
