import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'


import { MenuItem } from '../../Interfaces/MenuItem';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private GET_ALL_MENU_ITEMS_FROM_RESTAURANT_URL = environment.BASE_RESTAURANT_URL + '/:restId/menu-items'
  private GET_ALL_MENU_ITEMS_URL = environment.BASE_RESTAURANT_URL + '/menu-items'
  private GET_MENU_ITEM_FROM_RESTAURANT_URL = environment.BASE_RESTAURANT_URL + '/:restId/menu-items/:itemId'

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllMenuItems(): Observable<MenuItem[]> {
    const options = {
      headers: {
        'Authorization': <string>this.authService.token
      }
    }
    console.log(options)
    return this.http.get<MenuItem[]>(this.GET_ALL_MENU_ITEMS_URL, options)
  }

  getAllMenuItemsFromRestaurant(restId: string): Observable<MenuItem[]> {
    const options = {
      headers: {
        'Authorization': <string>this.authService.token
      }
    }
    console.log(options)
    return this.http.get<MenuItem[]>(this.GET_ALL_MENU_ITEMS_FROM_RESTAURANT_URL.replace(":restId", restId), options)
  }

  getAllMenuItemsFromSearch(search: string): Observable<MenuItem[]> {
    const options = {
      headers: {
        'Authorization': <string>this.authService.token
      }
    }
    console.log(options)
    return this.http.get<MenuItem[]>(this.GET_ALL_MENU_ITEMS_URL + search, options)
  }

  getAllMenuItemsInRestaurantFromSearch(restId: string, search: string): Observable<MenuItem[]> {
    const options = {
      headers: {
        'Authorization': <string>this.authService.token
      }
    }
    console.log(options)
    return this.http.get<MenuItem[]>(this.GET_ALL_MENU_ITEMS_FROM_RESTAURANT_URL.replace(":restId", restId) + search, options)
  }
}
