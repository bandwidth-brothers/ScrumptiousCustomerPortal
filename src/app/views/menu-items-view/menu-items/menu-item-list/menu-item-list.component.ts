import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Menuitem } from 'src/app/core/entities/menuitem';
import { MenuitemService } from 'src/app/core/services/menu-item.service';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.css']
})
export class MenuitemListComponent implements OnInit {
  routeSub!: Subscription;
  menuitems: Menuitem[] = [];
  restaurantId: string = "";
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private menuitemService: MenuitemService) { }

  ngOnInit(): void {
    this.initializeForm()
    this.routeSub = this.route.params.subscribe(params => {
      this.restaurantId = params.id
    })
    if (this.restaurantId === undefined) {
      this.menuitemService.getAllMenuitems().subscribe(menuitems => {
        this.menuitems = menuitems
      })
    } else {
      this.menuitemService.getAllMenuitemsFromRestaurant(this.restaurantId).subscribe(menuitems => {
        this.menuitems = menuitems
      })
    }


  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      search: ''
    })
  }

  searchHandle() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: 'name:' + this.searchForm.value.search
      },
      skipLocationChange: false
    }).then(() => {
      const search = this.route.snapshot.queryParamMap.get('search')
      if (this.searchForm.value.search.length === 0 && this.restaurantId === undefined) {
        this.menuitemService.getAllMenuitems().subscribe(menuitems => {
          this.menuitems = menuitems
        })
      } else if (this.searchForm.value.search.length === 0) {
        this.menuitemService.getAllMenuitemsFromRestaurant(this.restaurantId).subscribe(menuitems => {
          this.menuitems = menuitems
        })
      } else if (this.restaurantId === undefined) {
        this.menuitemService.getAllMenuitemsFromSearch("?search=" + search).subscribe(menuitems => {
          this.menuitems = menuitems
        })
      } else {
        this.menuitemService.getAllMenuitemsInRestaurantFromSearch(this.restaurantId, "?search=" + search).subscribe(menuitems => {
          this.menuitems = menuitems
        })
      }
    })

  }


  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }
}
