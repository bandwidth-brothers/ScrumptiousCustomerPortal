import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuItem } from 'src/app/entities/menu-item';
import { MenuItemService } from 'src/app/core/services/menu-item.service';


@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {
  @Input() callbackFunction!: (args: string) => void;
  routeSub!: Subscription;
  restaurantId: string = "";
  //menuItems: MenuItem[] = [];
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private menuItemService: MenuItemService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializeForm()
    this.routeSub = this.route.params.subscribe(params => {
      this.restaurantId = params.id
    })
    console.log("HELLO")
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
      this.callbackFunction(this.searchForm.value.search)
    })

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }
}
