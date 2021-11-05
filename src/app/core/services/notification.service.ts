import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { OrderMessageDto } from '../entities/OrderMessageDto';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

    readonly NOTIFCATION_URL = environment.BASE_NOTIFICATION_URL;

    public openSnackBar(message: string) {
        this.snackBar.open(message, '', {
            duration: 5000
        });
    }

    //PUT update an order with new restaurant
    sendTextMessageOrderConfirmation(orderMessage: OrderMessageDto, skip: boolean = false): Observable<void | HttpErrorResponse> {
        const url = `${this.NOTIFCATION_URL}/notification/order-confirmation`;


        return this.http.put<void>(url, orderMessage);
    }
}
