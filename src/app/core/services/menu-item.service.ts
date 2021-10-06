import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'


import { MenuItem } from '../../entities/menu-item';
import { Restaurant } from '../../entities/restaurant';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private GET_ALL_MENU_ITEMS_FROM_RESTAURANT_URL = environment.BASE_RESTAURANT_URL + '/menu/restaurants/:restaurantId/menu-items'
  private GET_ALL_MENU_ITEMS_URL = environment.BASE_RESTAURANT_URL + '/menu/menu-items'
  private GET_ALL_RESTAURANTS_FROM_MENU_ITEM_SEARCH = environment.BASE_RESTAURANT_URL + '/restaurants/restaurants/menu-items'
  private GET_MENU_ITEM_FROM_RESTAURANT_URL = environment.BASE_RESTAURANT_URL + '/menu/restaurants/:restaurantId/menu-items/:itemId'

  options: object = {}

  constructor(private http: HttpClient, private authService: AuthService) {
    this.options = {
      headers: {
        'Authorization': <string>this.authService.token
      }
    }
  }

  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.GET_ALL_MENU_ITEMS_URL, this.options)
  }

  getAllMenuItemsFromRestaurant(restaurantId: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.GET_ALL_MENU_ITEMS_FROM_RESTAURANT_URL.replace(":restaurantId", restaurantId), this.options)
  }

  getAllMenuItemsFromSearch(search: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.GET_ALL_MENU_ITEMS_URL + "?search=" + search, this.options)
  }

  getAllMenuItemsInRestaurantFromSearch(restaurantId: string, search: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.GET_ALL_MENU_ITEMS_FROM_RESTAURANT_URL.replace(":restaurantId", restaurantId) + "?search=" + search, this.options)
  }

  getAllRestaurantsFromMenuItemSearch(search: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.GET_ALL_RESTAURANTS_FROM_MENU_ITEM_SEARCH + "?search=" + search, this.options)
  }
}
