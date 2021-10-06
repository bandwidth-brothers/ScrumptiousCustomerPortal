import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Restaurant } from 'src/app/entities/restaurant';
import { MenuItem } from 'src/app/entities/menu-item';

import { MenuItemService } from 'src/app/core/services/menu-item.service';
import { RestaurantService } from 'src/app/core/services/restaurant.service';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})
export class RestaurantHomeComponent implements OnInit {
  routeSub!: Subscription;
  menuItems: MenuItem[] = [];
  restaurant!: Restaurant;
  restaurantId!: string;
  isLoading: boolean = true
  searchForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private menuItemService: MenuItemService,
    private router: Router,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializeForm()


    this.routeSub = this.route.params.subscribe(params => {
      this.restaurantId = params.id
    })

    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(restaurant => {
      this.restaurant = restaurant
    })

    this.menuItemService.getAllMenuItemsFromRestaurant(this.restaurantId).subscribe(menuItems => {
      this.menuItems = menuItems
      this.isLoading = false;
    })
  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      search: ''
    })
  }

  searchHandle() {//searchValue: string) {
    const searchValue = this.searchForm.value.search

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: 'name:' + this.searchForm.value.search
      },
      skipLocationChange: false
    }).then(() => {
      const search = this.route.snapshot.queryParamMap.get('search')
      this.isLoading = true;

      if (searchValue.length === 0 && this.restaurantId === undefined) {
        this.menuItemService.getAllMenuItems().subscribe(menuItems => {
          this.menuItems = menuItems
        })
      } else if (searchValue.search.length === 0) {
        this.menuItemService.getAllMenuItemsFromRestaurant(this.restaurantId).subscribe(menuItems => {
          this.menuItems = menuItems
        })
      } else if (this.restaurantId === undefined) {
        this.menuItemService.getAllMenuItemsFromSearch("?search=" + search).subscribe(menuItems => {
          this.menuItems = menuItems
        })
      } else {
        if (search === undefined) {
        }
        if (this.menuItemService === undefined) {
        }
        this.menuItemService.getAllMenuItemsInRestaurantFromSearch(this.restaurantId, "?search=" + search).subscribe(menuItems => {

          this.menuItems = menuItems
          this.isLoading = false;
        })
      }
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }
}
