import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './account/profile/profile.component';
import { ProfileDetailsComponent } from './account/profile-details/profile-details.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailsComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatExpansionModule,
    NgxMaskModule.forRoot(),

    SettingsRoutingModule,
  ],
  exports: [
    ProfileComponent,
    ProfileDetailsComponent,
    ChangePasswordComponent
  ]
})
export class SettingsViewModule { }
