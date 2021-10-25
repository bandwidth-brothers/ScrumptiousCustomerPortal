import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

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

  constructor(private customerService: CustomerService, 
    private notificationService: NotificationService,
    private route: ActivatedRoute, public orderService: OrderService, private router: Router) { }

  ngOnInit() {
    
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

  paymentCall(token: String) {
    console.log("payment called");
    this.orderService.chargeOrder(token, this.orderService.currentOrder?.id).subscribe((result) => {
      if(result !== ""){
        this.orderService.paidCheck(true);    
        this.router.navigate(['history']);
      }else{
        console.log("payment failed");
        this.notificationService.openSnackBar("payment failed");
      }

      
    });;
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
    return requestedDate.toLocaleString();

  }

  getFullAddress() {
    var address = this.customerService.customerProfile?.address;
    return address?.line1 + ", " + (address?.line2? address?.line2+", " : "") + " " + address?.city + " " + address?.state + ", " + address?.zip;
  }

}
