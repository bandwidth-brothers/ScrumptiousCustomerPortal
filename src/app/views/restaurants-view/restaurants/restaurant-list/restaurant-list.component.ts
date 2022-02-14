import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

import { Page } from 'src/app/core/entities/page';
import { Restaurant } from 'src/app/core/entities/restaurant';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { MenuitemService } from 'src/app/core/services/menu-item.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  routeSub!: Subscription;
  restaurants: Restaurant[] = [];
  restaurantId: string = "";
  searchForm!: FormGroup;
  pageSlice: Restaurant[] = [];
  currentPage: Page | undefined;
  pageSize: number = 5;
  pageIndex: number = 0;
  numberOfElements: number = 0;

  sortString: string = "";
  filterRatingString: string = "";
  filterPriceString: string = "";

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
    public spinnerService: SpinnerService,
    private restaurantService: RestaurantService,
    private menuitemService: MenuitemService) { }

  ngOnInit(): void {
    this.initializeForm()
    this.routeSub = this.route.params.subscribe(params => {
      this.restaurantId = params.id
    })

    let newSearch = "pageSize=" + this.pageSize + "&pageNumber=" + this.pageIndex

    this.restaurantService.getRestaurantsPaginatedFromSearch(newSearch || "").subscribe(page => {
      this.currentPage = page
      this.pageSlice = this.currentPage.content
      this.numberOfElements = this.currentPage.totalElements
      console.log(this.currentPage)
    })

    // this.restaurantService.getAllRestaurants().subscribe(restaurants => {
    //   this.restaurants = restaurants
    //   this.pageSlice = this.restaurants.slice(0, 5)
    //   this.numberOfElements = restaurants.length
    // })
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
        search: 'restaurantName=' + this.searchForm.value.search
      },
      skipLocationChange: false
    }).then(() => {
      const search = this.route.snapshot.queryParamMap.get('search')

      if (this.searchForm.value.search.length === 0) {
        this.restaurantService.getAllRestaurants().subscribe(restaurants => {
          this.restaurants = restaurants
        })
      } else {
        let newSearch = search + "&pageSize=" + this.pageSize + "&pageNumber=" + this.pageIndex
        console.log(newSearch)

        this.restaurantService.getRestaurantsPaginatedFromSearch(newSearch || "").subscribe(page => {
          this.currentPage = page
          this.pageSlice = this.currentPage.content
          this.numberOfElements = this.currentPage.totalElements
          console.log(this.currentPage)
        })
      }
    })

  }

  onSortBy(event: MatSelectChange) {
    console.log(event)

    switch (event.value) {
      case "Featured":
        break;
      case "Price: Low to High":
        this.sortString = "&sortBy=priceCategory&sortDirection=ASC"
        this.refreshResults()
        break;
      case "Price: High to Low":
        this.sortString = "&sortBy=priceCategory&sortDirection=DESC"
        this.refreshResults()
        break;
      case "Rating: Low to High":
        this.sortString = "&sortBy=rating&sortDirection=ASC"
        this.refreshResults()
        break;
      case "Rating: High to Low":
        this.sortString = "&sortBy=rating&sortDirection=DESC"
        this.refreshResults()
        break;
      case "Distance: Nearest to Farthest":
        this.sortString = ""
        break;
      case "Distance: Farthest to Nearest":
        this.sortString = ""
        break;
      default:
        this.sortString = ""
        break;
    }

  }

  onFilterByRating(event: MatSelectChange) {
    console.log(event)

    switch (event.value) {

      case "1 Stars & Up":
        this.filterRatingString = "&filterRating=.9"
        this.refreshResults()
        break;
      case "2 Stars & Up":
        this.filterRatingString = "&filterRating=1.9"
        this.refreshResults()
        break;
      case "3 Stars & Up":
        this.filterRatingString = "&filterRating=2.9"
        this.refreshResults()
        break;
      case "4 Stars & Up":
        this.filterRatingString = "&filterRating=3.9"
        this.refreshResults()
        break;
      default:
        this.filterRatingString = ""
        break;
    }
  }

  onFilterByPrice(event: MatSelectChange) {
    console.log(event)

    this.filterRatingString = ""

    if (event.value.indexOf("$") > -1) {
      this.filterRatingString = "&priceCategory=$"

    }
    if (event.value.indexOf("$$") > -1) {
      this.filterRatingString = this.filterRatingString + "&priceCategory=$$"

    }
    if (event.value.indexOf("$$$") > -1) {
      this.filterRatingString = this.filterRatingString + "&priceCategory=$$$"

    }

    this.refreshResults()
  }

  OnPageChange(event: PageEvent) {
    console.log(event)
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    let currentInd = event.pageSize * event.pageIndex
    let endInd = event.pageSize + currentInd
    if (endInd > event.length) {
      endInd = event.length
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchForm.value.search ? 'restaurantName=' + this.searchForm.value.search : ""
      },
      skipLocationChange: false
    }).then(() => {
      const search = this.route.snapshot.queryParamMap.get('search')
      console.log(this.searchForm.value.search)
      let newSearch;
      if (this.searchForm.value.search.length === 0) {

        newSearch = "pageSize=" + this.pageSize + "&pageNumber=" + this.pageIndex
        console.log(newSearch)
      } else {

        newSearch = search + "&pageSize=" + this.pageSize + "&pageNumber=" + this.pageIndex
        console.log(newSearch)
      }

      this.restaurantService.getRestaurantsPaginatedFromSearch(newSearch || "").subscribe(page => {
        this.currentPage = page
        this.pageSlice = this.currentPage.content
        this.numberOfElements = this.currentPage.totalElements
        console.log(this.currentPage)
      })
    })
    //this.pageSlice = this.restaurants.slice(currentInd, endInd)
  }

  refreshResults() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchForm.value.search ? 'restaurantName=' + this.searchForm.value.search : ""
      },
      skipLocationChange: false
    }).then(() => {
      const search = this.route.snapshot.queryParamMap.get('search')
      console.log(this.searchForm.value.search)
      let newSearch;
      if (this.searchForm.value.search.length === 0) {

        newSearch = "pageSize=" + this.pageSize + "&pageNumber=" + this.pageIndex + this.sortString + this.filterPriceString + this.filterRatingString
        console.log(newSearch)
      } else {

        newSearch = search + "&pageSize=" + this.pageSize + "&pageNumber=" + this.pageIndex + this.sortString + this.filterPriceString + this.filterRatingString
        console.log(newSearch)
      }

      this.restaurantService.getRestaurantsPaginatedFromSearch(newSearch || "").subscribe(page => {
        this.currentPage = page
        this.pageSlice = this.currentPage.content
        this.numberOfElements = this.currentPage.totalElements
        console.log(this.currentPage)
      })
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
