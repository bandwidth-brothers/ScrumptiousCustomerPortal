import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Customer } from 'src/app/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly CUSTOMERS_URL = environment.BASE_CUSTOMER_URL + '/customers';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  // GET all customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.CUSTOMERS_URL).pipe(
      catchError(this.handleError<Customer[]>('getCustomers', []))
    );
  }

  // GET a customer by ID
  getCustomer(id: string): Observable<Customer | HttpErrorResponse> {
    const url = `${this.CUSTOMERS_URL}/${id}`;
    return this.http.get<Customer>(url).pipe(
      catchError(this.handleError<HttpErrorResponse>('getCustomer'))
    );
  }

  //PUT update a customer
  updateCustomer(updatedCustomer: Customer) {
    const url = `${this.CUSTOMERS_URL}/${updatedCustomer.id}`;
    return this.http.put<Customer>(url, updatedCustomer, this.httpOptions);
  }

  //error handler passes back an HttpErrorResponse, handled in the component/view
  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      return of(err as T);
    };
  }
}