import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'src/app/Interfaces/MenuItem';
import { MENU_ITEMS } from 'src/app/mock-menu-items';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {
  menuItems: MenuItem[] = MENU_ITEMS

  constructor() { }

  ngOnInit(): void {
  }

}
