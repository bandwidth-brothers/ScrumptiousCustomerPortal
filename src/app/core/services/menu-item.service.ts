import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'


import { Menuitem } from '../../entities/menuitem';
import { Restaurant } from '../../entities/restaurant';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuitemService {
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

  getAllMenuitems(): Observable<Menuitem[]> {
    return this.http.get<Menuitem[]>(this.GET_ALL_MENU_ITEMS_URL, this.options)
  }

  getAllMenuitemsFromRestaurant(restaurantId: string): Observable<Menuitem[]> {
    return this.http.get<Menuitem[]>(this.GET_ALL_MENU_ITEMS_FROM_RESTAURANT_URL.replace(":restaurantId", restaurantId), this.options)
  }

  getAllMenuitemsFromSearch(search: string): Observable<Menuitem[]> {
    return this.http.get<Menuitem[]>(this.GET_ALL_MENU_ITEMS_URL + "?search=" + search, this.options)
  }

  getAllMenuitemsInRestaurantFromSearch(restaurantId: string, search: string): Observable<Menuitem[]> {
    return this.http.get<Menuitem[]>(this.GET_ALL_MENU_ITEMS_FROM_RESTAURANT_URL.replace(":restaurantId", restaurantId) + "?search=" + search, this.options)
  }

  getAllRestaurantsFromMenuitemSearch(search: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.GET_ALL_RESTAURANTS_FROM_MENU_ITEM_SEARCH + "?search=" + search, this.options)
  }
}
