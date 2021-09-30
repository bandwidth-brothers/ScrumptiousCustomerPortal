import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from 'src/app/core/services/auth.service';
import { Customer } from 'src/app/entities/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { trimStringLength } from 'src/app/shared/validators/validators';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

    @Input() customer: Customer | undefined;
    @Input() error: HttpErrorResponse | undefined;
    isLoading = false;
    startDate = new Date(1990, 0, 1);
    isReadOnly = true;
    states: string[] = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

    constructor(
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private authService: AuthService,
        private notificationService: NotificationService
    ) { }


    ngOnInit(): void {
        this.getCustomer();
    }


    customerProfileForm: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required, trimStringLength(1)]),
        lastName: new FormControl('', [Validators.required, trimStringLength(1)]),
        dob: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email, trimStringLength(1)]),
        veteranarianStatus: new FormControl(''),
        line1: new FormControl('', [Validators.required, trimStringLength(1)]),
        line2: new FormControl(''), //NOT required
        city: new FormControl('', [Validators.required, trimStringLength(1)]),
        state: new FormControl('', [Validators.required]),
        zip: new FormControl('', [
            Validators.required,
            Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/),
        ]),
        phone: new FormControl('', [
            Validators.required,
        ]),
        loyaltyPoints: new FormControl({ disabled: true }),
    });

    getCustomer(): void {
        const id = this.authService.userId;

        if (!id) {
            //todo navigate to login
        } else {
            this.customerService.getCustomer(id).subscribe((myCustomer) => this.setCustomer(myCustomer));
        }
    }

    setCustomer(response: Customer | HttpErrorResponse): void {
        if (this.checkIsValidCustomer(response)) {
            this.customer = response;

            this.customerProfileForm.patchValue(this.customer);
            // this will not fill in address information unless you explicitly feed it the address
            this.customerProfileForm.patchValue(this.customer.address);
        } else if (this.checkIsError(response)) {
            this.error = response;
        }
    }

    checkIsError(returnedValue: any): returnedValue is HttpErrorResponse {
        return (returnedValue as HttpErrorResponse).status !== undefined;
    }

    //get values from the form to update our customer in preparation for sending to the backend
    pullInCustomerFormValues(): void {
        (this.customer as Customer).firstName = this.customerProfileForm
            .get('firstName')
            ?.value.trim();
        (this.customer as Customer).lastName = this.customerProfileForm
            .get('lastName')
            ?.value.trim();

        (this.customer as Customer).dob = this.customerProfileForm.get("dob")?.value;

        (this.customer as Customer).address.line1 = this.customerProfileForm
            .get('line1')
            ?.value.trim();
        (this.customer as Customer).address.line2 = this.customerProfileForm
            .get('line2')
            ?.value.trim();
        (this.customer as Customer).address.city = this.customerProfileForm.get('city')?.value.trim();
        (this.customer as Customer).address.state = this.customerProfileForm.get('state')?.value.trim();
        (this.customer as Customer).address.zip = this.customerProfileForm.get('zip')?.value.trim();
        (this.customer as Customer).phone = this.customerProfileForm.get('phone')?.value.trim();
        //loyaltyPoints NOT updated
    }

    updateCustomer(): void {
        if (this.checkIsValidCustomer(this.customer)) {
            this.pullInCustomerFormValues();
            this.customerService.updateCustomer(this.customer).subscribe(
                (res) => {
                    //update succeeded
                    this.notificationService.openSnackBar('Your profile was successfully updated!');
                },
                (err) => {
                    this.notificationService.openSnackBar('There was an error updating your profile, please try again later.');
                }

            );

        }
    }



    checkIsValidCustomer(returnedValue: Customer | HttpErrorResponse | undefined): returnedValue is Customer {
        //try to cast it to a Customer and check its firstName to see if it's actually a customer
        return (returnedValue as Customer).firstName !== undefined;
    }

    enableEdit() {
        this.isReadOnly = false;
    }


}
