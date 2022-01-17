import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/core/entities/customer';
import { CustomerService } from 'src/app/core/services/customer.service';
import { trimStringLength } from 'src/app/shared/validators/validators';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

    @Input() customer!: Customer;
    @Input() error: HttpErrorResponse | undefined;
    isLoading = false;
    startDate = new Date(1990, 0, 1);
    maxDate = new Date();
    states: string[] = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

    constructor(
        private customerService: CustomerService,
        private notificationService: NotificationService,
    ) { }


    ngOnInit(): void {
        this.generalForm.disable();
        this.addressForm.disable();

        this.generalForm.patchValue(this.customer);
        this.addressForm.patchValue(this.customer.address);

    }



    generalForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, trimStringLength(1)]),
        lastName: new FormControl('', [Validators.required, trimStringLength(1)]),
        phone: new FormControl('', [Validators.required, trimStringLength(1)]),
        dob: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email, trimStringLength(1)]),
        veteranaryStatus: new FormControl(''),
        loyaltyPoints: new FormControl({ disabled: true }),
    });

    addressForm = new FormGroup({
        line1: new FormControl('', [Validators.required, trimStringLength(1)]),
        line2: new FormControl(''), //NOT required
        city: new FormControl('', [Validators.required, trimStringLength(1)]),
        state: new FormControl('', [Validators.required]),
        zip: new FormControl('', [
            Validators.required,
            Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/),
        ]),
    })



    //get values from the form to update our customer in preparation for sending to the backend
    pullInGeneralFormValues(): void {
        this.customer.firstName = this.generalForm
            .get('firstName')
            ?.value.trim();
        this.customer.lastName = this.generalForm
            .get('lastName')
            ?.value.trim();

        this.customer.dob = this.generalForm.get("dob")?.value;
        this.customer.veteranaryStatus = this.generalForm.get("veteranaryStatus")?.value;

        this.customer.phone = this.updatePhoneNumberFormat(this.generalForm.get("phone")?.value);
        //loyaltyPoints NOT updated
    }


    pullInAddressFormValues(): void {
        this.customer.address.line1 = this.addressForm
            .get('line1')
            ?.value.trim();
        this.customer.address.line2 = this.addressForm
            .get('line2')
            ?.value.trim();
        this.customer.address.city = this.addressForm.get('city')?.value.trim();
        this.customer.address.state = this.addressForm.get('state')?.value.trim();
        this.customer.address.zip = this.addressForm.get('zip')?.value.trim();


    }


    updateCustomerGeneral(): void {
        this.pullInGeneralFormValues();
        this.customerService.updateCustomer(this.customer).subscribe(
            (res) => {
                //update succeeded
                this.notificationService.openSnackBar('Your profile was successfully updated!');
            },
            (err) => {
                this.notificationService.openSnackBar('There was an error updating your profile, please try again later.');
            }

        );

        this.generalForm.disable();
    }

    updateCustomerAddress(): void {

        this.pullInAddressFormValues();
        this.customerService.updateCustomer(this.customer).subscribe(
            (res) => {
                //update succeeded
                this.notificationService.openSnackBar('Your address was successfully updated!');
            },
            (err) => {
                this.notificationService.openSnackBar('There was an error updating your address, please try again later.');
            }

        );
        this.addressForm.disable();
    }

    enableGeneralEdit() {
        this.generalForm.enable();
    }
    enableAddressEdit() {
        this.addressForm.enable();
    }


    //save number as 555-555-5555 for the backend
    updatePhoneNumberFormat(phone: any): string {

        const val = phone.replaceAll(/\D/g, '');
        return val.slice(0, 3) + '-' + val.slice(3, 6) + '-' + val.slice(6, 11);

    }
}
