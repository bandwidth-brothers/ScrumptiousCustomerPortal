import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Address } from 'src/app/core/entities/address';
import { RegisterDto } from 'src/app/core/entities/registerDto';
import { CustomerService } from 'src/app/core/services/customer.service';
import { passwordMatchValidator } from 'src/app/shared/validators/password.validator';
import { trimStringLength } from 'src/app/shared/validators/validators';

// TODO: create inputs for address fields

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [
        { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
    ]
})
export class RegisterComponent implements OnInit {

    maxDate = new Date();
    errorMsg?: string = undefined;
    isLoading = false;
    hide = true;
    hide2 = true;
    states: string[] = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    registrationForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, trimStringLength(1)]),
        lastName: new FormControl('', [Validators.required, trimStringLength(1)]),
        phone: new FormControl('', [Validators.required, trimStringLength(1)]),
        dob: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email, trimStringLength(1)]),
        veteranaryStatus: new FormControl(''),
        password: new FormControl('', [Validators.required, trimStringLength(1)]),
        confirmPassword: new FormControl('', [Validators.required, trimStringLength(1)]),

    }, (form: AbstractControl) => passwordMatchValidator(form));

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

    constructor(
        private titleService: Title,
        private notificationService: NotificationService,
        private router: Router,
        private customerService: CustomerService,
        private log: NGXLogger,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Scrumptious - Register');
    }

    register() {
        const address: Address = {
            line1: this.addressForm.get('line1')?.value,
            line2: this.addressForm.get('line2')?.value,
            city: this.addressForm.get('city')?.value,
            state: this.addressForm.get('state')?.value,
            zip: this.addressForm.get('zip')?.value
        }

        const registerDto: RegisterDto = {
            firstName: this.registrationForm.get('firstName')?.value,
            lastName: this.registrationForm.get('lastName')?.value,
            email: this.registrationForm.get('email')?.value,
            dob: this.registrationForm.get('dob')?.value,
            veteranaryStatus: this.registrationForm.get('veteranaryStatus')?.value,
            phone: this.updatePhoneNumberFormat(),
            password: this.registrationForm.get('password')?.value,
            address: address,

        }
        this.isLoading = true;

        this.customerService.createCustomer(registerDto).subscribe(
            () => {
                this.handleRegisterSuccess().then(() => {
                    this.registrationForm.reset();
                    this.addressForm.reset()
                });
            },
            (err: HttpErrorResponse) => {
                this.handleRegisterFailure(err);
            }
        );
    }

    async handleRegisterSuccess() {

        this.errorMsg = undefined;
        this.isLoading = false;
        this.notificationService.openSnackBar("Register successful");
        await this.router.navigate(['/auth/login']);
    }

    async handleRegisterFailure(err: HttpErrorResponse) {
        this.log.debug('Failure', err);
        this.isLoading = false;
        if (err.status === 403 || err.status === 401 || err.status === 409) {
            this.notificationService.openSnackBar('Email already registered to another user.');
            this.registrationForm.controls['email'].reset();
        } else {
            this.notificationService.openSnackBar('An error occurred while registering. Please try again.');

        }
    }

    /* Called on each input in either password field */
    onPasswordInput() {

        if (this.registrationForm.hasError('passwordMismatch'))
            this.registrationForm.get('confirmPassword')?.setErrors([{ 'passwordMismatch': true }]);
        else
            this.registrationForm.get('confirmPassword')?.setErrors(null);
    }

    //save number as 555-555-5555 for the backend
    updatePhoneNumberFormat(): string {
        const control = this.registrationForm.get('phone');
        if (control && control.valid) {
            const val = control.value.replaceAll(/\D/g, '');
            return val.slice(0, 3) + '-' + val.slice(3, 6) + '-' + val.slice(6, 11);
        }
        return '';
    }

}
