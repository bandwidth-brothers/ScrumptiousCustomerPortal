import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MenuitemModalComponent } from '../menu-items-view/menu-item-modal/menu-item-modal.component';
import { MenuitemListComponent } from '../menu-items-view/menu-item-list/menu-item-list.component';
import { MenuitemCardComponent } from './menu-item-card/menu-item-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    MenuitemModalComponent,
    MenuitemListComponent,
    MenuitemCardComponent,

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ],
  exports: [
    MenuitemModalComponent,
    MenuitemListComponent,
    MenuitemCardComponent
  ]
})
export class MenuItemsViewModule { }
