import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoggerTestingModule } from 'ngx-logger/testing';

import { MenuitemCardComponent } from './menu-item-card.component';

describe('MenuitemCardComponent', () => {
  let component: MenuitemCardComponent;
  let fixture: ComponentFixture<MenuitemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuitemCardComponent],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        LoggerTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuitemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
