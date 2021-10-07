import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../entities/order';
import { MenuitemOrder } from '../entities/menuitemOrder';
import { RegisterDto } from '../entities/registerDto';

@Injectable({
    providedIn: 'root'
})
export class OrderService {


    readonly ORDERS_URL = environment.BASE_ORDERS_URL;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient, private log: NGXLogger) { }

    // GET all orders
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.ORDERS_URL).pipe(
            tap((_) => this.log.debug('successfully got all orders')),
            catchError(this.handleError<Order[]>('getOrders', []))
        );
    }

    // GET a order by ID
    getOrder(id: number): Observable<Order | HttpErrorResponse> {
        const url = `${this.ORDERS_URL}/${id.toString()}`;
        return this.http.get<Order>(url).pipe(
            tap((_) => this.log.debug('successfully got order ' + _.id)),
            catchError(this.handleError<HttpErrorResponse>('getOrder'))
        );
    }

    //PUT update an order
    updateOrder(updatedOrder: Order) {
        const url = `${this.ORDERS_URL}/${updatedOrder.id}`;
        return this.http.put<Order>(url, updatedOrder, this.httpOptions);
    }

    // POST new order
    createOrder(order: Order) {
        return this.http.post<Order>(this.ORDERS_URL, order);
    }

    // POST new menuitemOrder
    addMenuitemToOrder(orderId: number, menuitemId: number, quantity: number) {
        const url = `${this.ORDERS_URL}/${orderId.toString()}/menuitems/${menuitemId.toString()}`;
        return this.http.post<MenuitemOrder>(url, quantity);
    }


    //error handler passes back an HttpErrorResponse, handled in the component/view
    private handleError<T>(operation = 'operation', result?: T) {
        return (err: any): Observable<T> => {
            this.log.debug(`error in ${operation}`);
            return of(err as T);
        };
    }
}
