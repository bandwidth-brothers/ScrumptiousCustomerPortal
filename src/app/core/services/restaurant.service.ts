import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { delay, concatMap } from 'rxjs/operators';

import { Restaurant } from 'src/app/core/entities/restaurant';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private GET_ALL_RESTAURANTS_URL = environment.BASE_RESTAURANT_URL + '/restaurants/restaurants'
  private GET_ALL_RESTAURANT_BY_ID_URL = environment.BASE_RESTAURANT_URL + '/restaurants/restaurants/:restaurantId'

  options: object = {}

  constructor(private http: HttpClient, private authService: AuthService) {
    this.options = {
      headers: {
        'Authorization': <string>this.authService.token
      }
    }
  }

  getAllRestaurants(): Observable<Restaurant[]> {

    return this.http.get<Restaurant[]>(this.GET_ALL_RESTAURANTS_URL, this.options)
  }

  getRestaurantById(restaurantId: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.GET_ALL_RESTAURANT_BY_ID_URL
      .replace(":restaurantId", restaurantId), this.options)
  }
}
