import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Customer } from '../entities/customer';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../core/services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { trimStringLength } from '../shared/validators/validators';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  // @Input() customer: Customer | undefined;
  // @Input() error: HttpErrorResponse | undefined;
  // //user: any;
  // id: any;
  // image: any;
  // isLoading = false;
  // modalMsg?: string = undefined;

  // constructor(
  //   private route: ActivatedRoute,
  //   private customerService: CustomerService,
  //   private authService: AuthService
  // ) { }


  ngOnInit(): void {
    // this.route.params.subscribe(event => {
    //   this.id = event.id;
    // });
    // this.getCustomer();
    //this.loadUser(this.id);

  }

  // customerProfileForm: FormGroup = new FormGroup({
  //   firstName: new FormControl('', [Validators.required, trimStringLength(1)]),
  //   lastName: new FormControl('', [Validators.required, trimStringLength(1)]),
  //   addrLine1: new FormControl('', [Validators.required, trimStringLength(1)]),
  //   addrLine2: new FormControl('', [trimStringLength(1)]), //NOT required
  //   city: new FormControl('', [Validators.required, trimStringLength(1)]),
  //   state: new FormControl('', [Validators.required]),
  //   zip: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/),
  //   ]),
  //   phone: new FormControl('', [
  //     Validators.required,
  //   ]),
  //   dob: new FormControl(['', trimStringLength(1)]),
  //   loyaltyPoints: new FormControl({ disabled: true }),
  // });

  // //should we show an error for the specified field?
  // showErrorForField(field: string) {
  //   const control = this.customerProfileForm.get(field); //get the specified form field, such as firstNameControl
  //   //yes, if the specified field exists, has been used by the customer, and isn't valid
  //   return control && control.touched && control.invalid;
  // }

  // getCustomer(): void {
  //   const id = this.authService.userId;

  //   if (!id) {
  //     //todo navigate to login
  //   } else {
  //     this.customerService.getCustomer(id).subscribe((myCustomer) => this.setCustomer(myCustomer));
  //   }
  // }

  // setCustomer(response: Customer | HttpErrorResponse): void {
  //   if (this.checkIsValidCustomer(response)) {
  //     this.customer = response;
  //     this.fillThisCustomerAddr();
  //     //must set values after fillThisUserAddr, when address is flattened onto the user
  //     this.customerProfileForm.patchValue(this.customer);
  //     //must format phone number properly for the validator's sake
  //   } else if (this.checkIsError(response)) {
  //     this.error = response;
  //   }
  // }

  // checkIsError(returnedValue: any): returnedValue is HttpErrorResponse {
  //   return (returnedValue as HttpErrorResponse).status !== undefined;
  // }

  // //get values from the form to update our customer in preparation for sending to the backend
  // pullInCustomerFormValues(): void {
  //   (this.customer as Customer).firstName = this.customerProfileForm
  //     .get('firstName')
  //     ?.value.trim();
  //   (this.customer as Customer).lastName = this.customerProfileForm
  //     .get('lastName')
  //     ?.value.trim();
  //   (this.customer as Customer).addrLine1 = this.customerProfileForm
  //     .get('addrLine1')
  //     ?.value.trim();
  //   (this.customer as Customer).addrLine2 = this.customerProfileForm
  //     .get('addrLine2')
  //     ?.value.trim();
  //   (this.customer as Customer).city = this.customerProfileForm.get('city')?.value.trim();
  //   (this.customer as Customer).state = this.customerProfileForm.get('state')?.value.trim();
  //   (this.customer as Customer).zip = this.customerProfileForm
  //     .get('zip')
  //     ?.value.trim();
  //   (this.customer as Customer).phone = this.customerProfileForm.get('phone')?.value.trim();
  //   //loyaltyPoints NOT updated
  // }

  // fillThisCustomerAddr(): void {
  //   if (this.checkIsValidCustomer(this.customer)) {
  //     this.customer.addrLine1 = this.customer.addresses[0].line1;
  //     this.customer.addrLine2 = this.customer.addresses[0].line2;
  //     this.customer.city = this.customer.addresses[0].city;
  //     this.customer.state = this.customer.addresses[0].state;
  //     this.customer.zip = this.customer.addresses[0].zip;
  //   }
  // }

  // // loadAllUsers() {
  // //   this.httpService.getAll(`${environment.BASE_USER_URL}${environment.USERS_GET_ALL_URL}`).subscribe((res) => {
  // //     this.user = res;
  // //   });
  // // }

  // // loadUser(id: any) {
  // //   this.httpService.getById(`${environment.BASE_USER_URL}${environment.USERS_GET_URL}` + id).subscribe((res) => {
  // //     this.user = res;
  // //     console.log(id);
  // //   });
  // // }

  // updateCustomer(): void {
  //   if (this.checkIsValidCustomer(this.customer)) {
  //     this.pullInCustomerFormValues();
  //     this.customerService.updateCustomer(this.customer).subscribe(
  //       (res) => {
  //         //update succeeded
  //         this.modalMsg = 'Your profile was updated successfully!';
  //       },
  //       (err) => {
  //         this.modalMsg =
  //           'There was an error updating your profile, please try again later.';
  //       }
  //     );
  //   }
  // }



  // checkIsValidCustomer(
  //   returnedValue: Customer | HttpErrorResponse | undefined
  // ): returnedValue is Customer {
  //   //try to cast it to a Customer and check its firstName to see if it's actually a customer
  //   return (returnedValue as Customer).firstName !== undefined;
  // }

  // onCloseAlert() {
  //   this.modalMsg = undefined;
  // }


}
