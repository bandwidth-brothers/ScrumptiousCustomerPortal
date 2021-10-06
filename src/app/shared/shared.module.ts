import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContentPlaceholderAnimationComponent } from './content-placeholder-animation/content-placeholder-animation.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SearchFieldComponent } from './search-field/search-field.component';

@NgModule({
  imports: [
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
    LimitToPipe,
    LocalDatePipe,
    YesNoPipe,
    LayoutComponent,
    SearchFieldComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    LimitToPipe,
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
    LocalDatePipe,
    YesNoPipe,
    SearchFieldComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
