import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Restaurant } from 'src/app/Interfaces/Restaurant';
import { RestaurantService } from 'src/app/core/services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  routeSub!: Subscription;
  restaurants: Restaurant[] = [];
  restaurantId: string = "";
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.initializeForm()
    this.routeSub = this.route.params.subscribe(params => {
      this.restaurantId = params.id
      console.log(params)
    })

    this.restaurantService.getAllRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants
      console.log(restaurants)
    })


  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      search: ''
    })
  }

  searchHandle() {
    console.log(this.searchForm.value.search)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: 'name:' + this.searchForm.value.search
      },
      skipLocationChange: false
    }).then(() => {
      // const search = this.route.snapshot.queryParamMap.get('search')
      // if (this.searchForm.value.search.length === 0 && this.restaurantId === undefined) {
      //   this.menuItemService.getAllMenuItems().subscribe(menuItems => {
      //     this.menuItems = menuItems
      //     console.log(menuItems)
      //   })
      // } else if (this.searchForm.value.search.length === 0) {
      //   this.menuItemService.getAllMenuItemsFromRestaurant(this.restaurantId).subscribe(menuItems => {
      //     this.menuItems = menuItems
      //     console.log(menuItems)
      //   })
      // } else if (this.restaurantId === undefined) {
      //   this.menuItemService.getAllMenuItemsFromSearch("?search=" + search).subscribe(menuItems => {
      //     this.menuItems = menuItems
      //     console.log(menuItems)
      //   })
      // } else {
      //   this.menuItemService.getAllMenuItemsInRestaurantFromSearch(this.restaurantId, "?search=" + search).subscribe(menuItems => {
      //     this.menuItems = menuItems
      //     console.log(menuItems)
      //   })
      // }
    })

  }


  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }

}
