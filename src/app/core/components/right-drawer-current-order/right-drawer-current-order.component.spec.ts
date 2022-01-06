import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightDrawerCurrentOrderComponent } from './right-drawer-current-order.component';

describe('RightDrawerCurrentOrderComponent', () => {
  let component: RightDrawerCurrentOrderComponent;
  let fixture: ComponentFixture<RightDrawerCurrentOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightDrawerCurrentOrderComponent ]
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
