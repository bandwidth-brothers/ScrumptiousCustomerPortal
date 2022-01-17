import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ContentPlaceholderAnimationComponent } from './components/content-placeholder-animation/content-placeholder-animation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { CartPriceOverviewComponent } from 'src/app/shared/utils/cart-price-overview/cart-price-overview.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CoreModule } from '../core/core.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatPaginatorModule } from '@angular/material/paginator';

import { SortByPricePipe } from './pipes/sort-by-price.pipe';
import { SortByRatingPipe } from './pipes/sort-by-rating.pipe';
import { SortByDistancePipe } from './pipes/sort-by-distance.pipe';
import { FilterByRatingPipe } from './pipes/filter-by-rating.pipe';
import { ToNumberPipe } from './pipes/to-number.pipe';
import { FilterByPriceCategoryPipe } from './pipes/filter-by-price-category.pipe';
import { StarRatingComponent } from './utils/star-rating/star-rating.component';
import { LayoutComponent } from './layout/layout.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatGridListModule,
    CoreModule,
    MatStepperModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTableModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FlexLayoutModule,
    MatPaginatorModule,
  ],
  declarations: [
    SortByPricePipe,
    SortByRatingPipe,
    SortByDistancePipe,
    FilterByRatingPipe,
    ToNumberPipe,
    FilterByPriceCategoryPipe,

    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
    SearchFieldComponent,
    CartPriceOverviewComponent,
    StarRatingComponent,
    TimePickerComponent,
    LayoutComponent
  ],
  exports: [
    SortByPricePipe,
    SortByRatingPipe,
    SortByDistancePipe,
    FilterByRatingPipe,
    ToNumberPipe,
    FilterByPriceCategoryPipe,

    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
    SearchFieldComponent,
    TimePickerComponent,
    CartPriceOverviewComponent,
    StarRatingComponent,
    LayoutComponent,

    MatGridListModule,
    MatStepperModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTableModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatInputModule,
    FlexLayoutModule,
    MatPaginatorModule,

  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
