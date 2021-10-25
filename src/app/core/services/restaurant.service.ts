import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { Restaurant } from 'src/app/entities/restaurant';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private GET_ALL_RESTAURANTS_URL = environment.BASE_RESTAURANT_URL + '/restaurants/restaurants'
  private GET_ALL_RESTAURANT_BY_ID_URL = environment.BASE_RESTAURANT_URL + '/restaurants/restaurants/:restaurantId'

  constructor(private http: HttpClient) {

  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.GET_ALL_RESTAURANTS_URL);
  }

  getRestaurantById(restaurantId: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.GET_ALL_RESTAURANT_BY_ID_URL
      .replace(":restaurantId", restaurantId));
  }
}
