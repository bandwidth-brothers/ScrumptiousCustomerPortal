import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';

import { RightDrawerCurrentOrderComponent } from './right-drawer-current-order.component';

describe('RightDrawerCurrentOrderComponent', () => {
  let component: RightDrawerCurrentOrderComponent;
  let fixture: ComponentFixture<RightDrawerCurrentOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        LoggerTestingModule,
        RouterTestingModule
      ],
      declarations: [RightDrawerCurrentOrderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightDrawerCurrentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
