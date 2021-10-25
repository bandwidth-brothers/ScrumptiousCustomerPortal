import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCartModalComponent } from './update-cart-modal.component';

describe('UpdateCartModalComponent', () => {
  let component: UpdateCartModalComponent;
  let fixture: ComponentFixture<UpdateCartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCartModalComponent]
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
