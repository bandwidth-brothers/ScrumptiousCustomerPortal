import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth.service';
import { Customer } from 'src/app/core/entities/customer';
import { CustomerService } from 'src/app/core/services/customer.service';
import { AwsService } from 'src/app/core/services/aws.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //customer: Customer;
  url!: string | ArrayBuffer | null
  tmpUrl!: string | ArrayBuffer | null
  secureUrl!: string
  fileData!: Blob
  editing: boolean = false;
  customer!: Customer
  error!: HttpErrorResponse

  constructor(private titleService: Title,
    private authService: AuthService,
    private awsService: AwsService,
    private notificationService: NotificationService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.titleService.setTitle('Scrumptious - Profile');
    const id = this.authService.userId;
    //get customer
    this.getCustomer();
  }

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
      if (response.picture) {
        this.url = response.picture
      } else {
        this.url = "https://image-upload-scrumptious.s3.amazonaws.com/user-icon.png"
      }

    } else if (this.checkIsError(response)) {
      this.error = response;
    }
  }

  checkIsError(returnedValue: any): returnedValue is HttpErrorResponse {
    return (returnedValue as HttpErrorResponse).status !== undefined;
  }

  checkIsValidCustomer(
    returnedValue: Customer | HttpErrorResponse | undefined
  ): returnedValue is Customer {
    //try to cast it to a Customer and check its firstName to see if it's actually a customer
    return (returnedValue as Customer).firstName !== undefined;
  }

  uploadImage(fileInputEvent: any) {
    this.fileData = fileInputEvent.target.files[0]
    console.log(this.fileData);

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData)
    reader.onload = () => {
      this.tmpUrl = reader.result;
    }

    console.log(this.customer)


  }

  saveImage() {
    //console.log(this.fileData)
    // get secure url from our server backend
    this.awsService.getSecureURL().subscribe((url) => {
      if (url) {
        this.secureUrl = url
        console.log(url)

        // post the image directly to s3 bucket
        this.awsService.insertImageToBucket(this.secureUrl, this.fileData).subscribe(() => {
          this.url = this.secureUrl.split('?')[0]

          // post req to store data to DB
          this.customerService.updateCustomer({ ...this.customer, picture: this.url }).subscribe(
            (res) => {
              //update succeeded
              this.disableEdit()
              this.notificationService.openSnackBar('Your profile was successfully updated!');
            },
            (err) => {
              this.notificationService.openSnackBar('There was an error updating your profile, please try again later.');
            }
          );
        })

      }
    })
  }

  enableEdit() {
    this.editing = true;
    this.tmpUrl = this.url
  }

  disableEdit() {
    this.editing = false;
  }

}





