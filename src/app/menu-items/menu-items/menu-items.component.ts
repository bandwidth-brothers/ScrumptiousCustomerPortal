import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuItem } from 'src/app/Interfaces/MenuItem';
import { MenuItemService } from 'src/app/core/services/menu-item.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {
  routeSub!: Subscription;
  menuItems: MenuItem[] = [];
  restaurantId: string = "";
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private menuItemService: MenuItemService) { }

  ngOnInit(): void {
    this.initializeForm()
    this.routeSub = this.route.params.subscribe(params => {
      this.restaurantId = params.id
      console.log(params)
    })
    if (this.restaurantId === undefined) {
      this.menuItemService.getAllMenuItems().subscribe(menuItems => {
        this.menuItems = menuItems
        console.log(menuItems)
      })
    } else {
      this.menuItemService.getAllMenuItemsFromRestaurant(this.restaurantId).subscribe(menuItems => {
        this.menuItems = menuItems
        console.log(menuItems)
      })
    }


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
      const search = this.route.snapshot.queryParamMap.get('search')
      if (this.searchForm.value.search.length === 0 && this.restaurantId === undefined) {
        this.menuItemService.getAllMenuItems().subscribe(menuItems => {
          this.menuItems = menuItems
          console.log(menuItems)
        })
      } else if (this.searchForm.value.search.length === 0) {
        this.menuItemService.getAllMenuItemsFromRestaurant(this.restaurantId).subscribe(menuItems => {
          this.menuItems = menuItems
          console.log(menuItems)
        })
      } else if (this.restaurantId === undefined) {
        this.menuItemService.getAllMenuItemsFromSearch("?search=" + search).subscribe(menuItems => {
          this.menuItems = menuItems
          console.log(menuItems)
        })
      } else {
        this.menuItemService.getAllMenuItemsInRestaurantFromSearch(this.restaurantId, "?search=" + search).subscribe(menuItems => {
          this.menuItems = menuItems
          console.log(menuItems)
        })
      }
    })

  }


  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }
}
