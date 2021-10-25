import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/core/entities/order';
import { MenuitemOrder } from 'src/app/core/entities/menuitemOrder';
import { UpdateOrderDto } from 'src/app/core/entities/updateOrderDto';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    currentOrder: Order | undefined;
    customerOrders: Order[] | undefined;
    readonly ORDERS_URL = environment.BASE_ORDERS_URL;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'skip': 'false'
        }),
    };

    constructor(private http: HttpClient, private log: NGXLogger) {
    }

    // GET all orders
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.ORDERS_URL).pipe(
            tap((_) => this.log.debug('successfully got all orders')),
            catchError(this.handleError<Order[]>('getOrders', []))
        );
    }

    // GET orders by customerID
    getOrdersByCustomerId(customerId: string): Observable<Order[]> {
        const url = `${this.ORDERS_URL}/customers/${customerId.toString()}`;
        return this.http.get<Order[]>(url).pipe(
            tap((res) => {
                this.log.debug('successfully got orders from customerID');
                this.customerOrders = res;
            }),
            catchError(this.handleError<Order[]>('getOrdersByCustomerId'))
        );
    }

    // GET a order by ID
    getOrderById(id: number): Observable<Order | HttpErrorResponse> {
        const url = `${this.ORDERS_URL}/${id.toString()}`;
        return this.http.get<Order>(url).pipe(
            tap((_) => this.log.debug('successfully got order ' + _.id)),
            catchError(this.handleError<HttpErrorResponse>('getOrder'))
        );
    }

    //PUT update an order
    updateOrder(updateOrderDto: UpdateOrderDto) {
        const url = `${this.ORDERS_URL}/${updateOrderDto.id}`;
        return this.http.put<void>(url, updateOrderDto, this.httpOptions).pipe(
            tap((_) => this.log.debug('updated order ' + updateOrderDto.id),
                catchError(this.handleError<HttpErrorResponse>('updateOrder'))
            ));
    }

    //PUT update an order with new restaurant
    updateOrderRestaurant(orderId: number, restaurantId: number, skip: boolean = false): Observable<void | HttpErrorResponse> {
        const url = `${this.ORDERS_URL}/${orderId}`;
        console.log(this.httpOptions.headers)
        if (skip) {
            this.httpOptions.headers = this.httpOptions.headers.set('skip', 'true')
        }
        console.log(this.httpOptions.headers)

        return this.http.put<void>(url, { restaurantId }, this.httpOptions).pipe(
            tap((_) => this.log.debug('updated order ' + orderId),
                catchError(this.handleError<HttpErrorResponse>('updateOrderRestaurant'))
            ));
    }

    // POST new order
    createOrder(customerId: string): Observable<void | HttpErrorResponse> {
        return this.http.post<void>(this.ORDERS_URL, { customerId }, this.httpOptions);
    }

    // POST new menuitemOrder
    addMenuitemToOrder(orderId: number, menuitemId: number, quantity: number) {
        const url = `${this.ORDERS_URL}/${orderId.toString()}`;
        return this.http.post<MenuitemOrder>(url, { menuitemId, quantity }, this.httpOptions);
    }

    // DELETE menuitemOrder
    removeMenuitemFromOrder(orderId: number, menuitemId: number) {
        const url = `${this.ORDERS_URL}/${orderId}/menuitems/${menuitemId}`;
        // this.http.delete does not accept a body so we're doing it this way
        return this.http.request<void>('delete', url, { body: { orderId, menuitemId } });
    }

    // DELETE all menuitemOrder
    removeAllMenuitemsFromOrder(orderId: number) {
        const url = `${this.ORDERS_URL}/${orderId}/menuitems`;
        // this.http.delete does not accept a body so we're doing it this way
        return this.http.request<void>('delete', url, { body: orderId });
    }

    //error handler passes back an HttpErrorResponse, handled in the component/view
    private handleError<T>(operation = 'operation', result?: T) {
        return (err: any): Observable<T> => {
            this.log.debug(`error in ${operation}`);
            return of(err as T);
        };
    }
}
