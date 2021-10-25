import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

import { Customer } from 'src/app/entities/customer';
import { environment } from 'src/environments/environment';
import { RegisterDto } from '../entities/registerDto';

@Injectable({
	providedIn: 'root',
})
export class CustomerService {

	customerProfile: Customer | undefined;

	readonly CUSTOMERS_URL = environment.BASE_CUSTOMERS_URL;
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

	constructor(private http: HttpClient, private log: NGXLogger) { }

	// GET all customers
	getCustomers(): Observable<Customer[]> {
		return this.http.get<Customer[]>(this.CUSTOMERS_URL).pipe(
			tap((_) => this.log.debug('successfully got all customers')),
			catchError(this.handleError<Customer[]>('getCustomers', []))
		);
	}

	// GET a customer by ID
	getCustomer(id: string): Observable<Customer | HttpErrorResponse> {
		const url = `${this.CUSTOMERS_URL}/${id}`;
		return this.http.get<Customer>(url).pipe(
			tap((_) => this.log.debug('successfully got customer ' + _.id)),
			catchError(this.handleError<HttpErrorResponse>('getCustomer'))
		);
	}

	//PUT update a customer
	updateCustomer(updatedCustomer: Customer) {
		const url = `${this.CUSTOMERS_URL}/${updatedCustomer.id}`;
		//updatedCustomer.customerId = id;
		return this.http.put<Customer>(url, updatedCustomer, this.httpOptions);
	}

	// POST new customer
	createCustomer(registerDto: RegisterDto) {
		return this.http.post<Customer>(this.CUSTOMERS_URL, registerDto);
	}


	//error handler passes back an HttpErrorResponse, handled in the component/view
	private handleError<T>(operation = 'operation', result?: T) {
		return (err: any): Observable<T> => {
			this.log.debug(`error in ${operation}`);
			return of(err as T);
		};
	}
}