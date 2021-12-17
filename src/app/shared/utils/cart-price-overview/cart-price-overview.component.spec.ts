import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPriceOverviewComponent } from './cart-price-overview.component';

describe('CartPriceOverviewComponent', () => {
  let component: CartPriceOverviewComponent;
  let fixture: ComponentFixture<CartPriceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPriceOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPriceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
