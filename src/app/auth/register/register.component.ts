import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Address } from 'src/app/entities/address';
import { RegisterDto } from 'src/app/entities/registerDto';
import { CustomerService } from 'src/app/services/customer.service';
import { passwordMatchValidator } from 'src/app/shared/validators/passwordMatchValidator';

// TODO: create inputs for address fields

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMsg?: string = undefined;
  isLoading = false;
  hide = true;
  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, (form: AbstractControl) => passwordMatchValidator(form));


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
    const theBiggestInt = 9007199254740991;
    const address: Address = {
      id: "23948",
      line1: '234 Oakmont Str.',
      line2: '',
      city: 'Charlesville',
      state: 'KY',
      zip: '35489'
    }

    const registerDto: RegisterDto = {
      firstName: this.registrationForm.get('firstName')?.value,
      lastName: this.registrationForm.get('lastName')?.value,
      email: this.registrationForm.get('email')?.value,
      phone: this.registrationForm.get('phone')?.value,
      password: this.registrationForm.get('password')?.value,
      address: address

    }

    this.isLoading = true;

    this.customerService.createCustomer(registerDto).subscribe(
      () => {
        this.handleRegisterSuccess().then(() => this.registrationForm.reset());
      },
      (err: HttpErrorResponse) => {
        this.handleRegisterFailure(err).then(() => this.registrationForm.reset());
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

}
