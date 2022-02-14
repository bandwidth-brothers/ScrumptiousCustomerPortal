import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { Restaurant } from 'src/app/core/entities/restaurant';
import { environment } from '../../../environments/environment';
import { Page } from '../entities/page';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private GET_ALL_RESTAURANTS_URL = environment.BASE_RESTAURANT_URL + '/restaurants/restaurants'
  private GET_ALL_RESTAURANT_BY_ID_URL = environment.BASE_RESTAURANT_URL + '/restaurants/restaurants/:restaurantId'
  private GET_ALL_RETAURANTS_FROM_SEARCH = environment.BASE_RESTAURANT_URL + '/restaurants/restaurants/search?'

  constructor(private http: HttpClient) {

  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.GET_ALL_RESTAURANTS_URL);
  }

  getRestaurantById(restaurantId: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.GET_ALL_RESTAURANT_BY_ID_URL
      .replace(":restaurantId", restaurantId));
  }

  getRestaurantsPaginatedFromSearch(searchParam: string): Observable<Page> {
    return this.http.get<Page>(this.GET_ALL_RETAURANTS_FROM_SEARCH + searchParam)
  }
}
