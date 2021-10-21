import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContentPlaceholderAnimationComponent } from './content-placeholder-animation/content-placeholder-animation.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SearchFieldComponent } from './search-field/search-field.component';
import { CartPriceOverviewComponent } from 'src/app/util/cart-price-overview/cart-price-overview.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatGridListModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
    LayoutComponent,
    SearchFieldComponent,
    CartPriceOverviewComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
    SearchFieldComponent,
    CartPriceOverviewComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
