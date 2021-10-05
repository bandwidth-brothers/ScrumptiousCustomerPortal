import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth.service';
import { Customer } from 'src/app/entities/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //customer: Customer;

  constructor(private titleService: Title,
    private authService: AuthService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.titleService.setTitle('Scrumptious - Profile');
    const id = this.authService.userId;
    //get customer

  }


  checkIsValidCustomer(
    returnedValue: Customer | HttpErrorResponse | undefined
  ): returnedValue is Customer {
    //try to cast it to a Customer and check its firstName to see if it's actually a customer
    return (returnedValue as Customer).firstName !== undefined;
  }

}





