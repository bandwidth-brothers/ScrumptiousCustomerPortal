import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Restaurant } from 'src/app/Interfaces/Restaurant';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private GET_ALL_RESTAURANTS_URL = environment.BASE_RESTAURANT_URL + '/admin/restaurants'

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllRestaurants(): Observable<Restaurant[]> {
    const options = {
      headers: {
        'Authorization': <string>this.authService.token
      }
    }
    console.log(options)
    return this.http.get<Restaurant[]>(this.GET_ALL_RESTAURANTS_URL, options)
  }


}
