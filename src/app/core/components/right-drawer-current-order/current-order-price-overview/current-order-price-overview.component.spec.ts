import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOrderPriceOverviewComponent } from './current-order-price-overview.component';

describe('CurrentOrderPriceOverviewComponent', () => {
  let component: CurrentOrderPriceOverviewComponent;
  let fixture: ComponentFixture<CurrentOrderPriceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentOrderPriceOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentOrderPriceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
