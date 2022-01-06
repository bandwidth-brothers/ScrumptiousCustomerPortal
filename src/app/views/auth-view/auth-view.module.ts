import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordResetRequestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot(),

    AuthRoutingModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    PasswordResetRequestComponent
  ]
})
export class AuthViewModule { }
