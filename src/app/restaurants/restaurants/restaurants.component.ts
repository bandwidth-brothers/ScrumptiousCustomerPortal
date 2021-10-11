import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Restaurant } from 'src/app/entities/restaurant';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { MenuitemService } from 'src/app/core/services/menu-item.service';


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
  sortBy: string[] = [
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Rating: Low to High",
    "Rating: High to Low",
    "Distance: Nearest to Farthest",
    "Distance: Farthest to Nearest",
  ]
  selectedSortBy: string = "Featured";

  filterByRating: string[] = [
    "1 Stars & Up",
    "2 Stars & Up",
    "3 Stars & Up",
    "4 Stars & Up"
  ]
  ratingThreshold: string = "0";

  filterByPrice: string[] = [
    "$",
    "$$",
    "$$$",
  ]
  priceCategories = new FormControl({ value: ['$', '$$', '$$$'], disabled: false });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private menuitemService: MenuitemService) { }

  ngOnInit(): void {
    this.initializeForm()
    this.routeSub = this.route.params.subscribe(params => {
      this.restaurantId = params.id
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
    console.log(this.priceCategories)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: 'name:' + this.searchForm.value.search
      },
      skipLocationChange: false
    }).then(() => {
      const search = this.route.snapshot.queryParamMap.get('search')

      if (this.searchForm.value.search.length === 0) {
        this.restaurantService.getAllRestaurants().subscribe(restaurants => {
          this.restaurants = restaurants
        })
      } else {
        this.menuitemService.getAllRestaurantsFromMenuitemSearch(search || "").subscribe(restaurants => {
          this.restaurants = restaurants
        })
      }
    })

  }


  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }

}
