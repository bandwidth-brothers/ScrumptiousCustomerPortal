import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoggerTestingModule } from 'ngx-logger/testing';

import { UpdateCartModalComponent } from './update-cart-modal.component';

describe('UpdateCartModalComponent', () => {
  let component: UpdateCartModalComponent;
  let fixture: ComponentFixture<UpdateCartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCartModalComponent],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        LoggerTestingModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            order: {
              id: 1,
              customer: {},
              restaurant: {},
              confirmationCode: "3",
              requestedDeliveryTime: Date.now(),
              orderDiscount: 0,
              preparationStatus: "testing",
              menuitemOrders: []
            }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
