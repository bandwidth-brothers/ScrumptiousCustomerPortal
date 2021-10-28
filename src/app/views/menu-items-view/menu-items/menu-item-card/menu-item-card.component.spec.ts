import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuitemCardComponent } from './menu-item-card.component';

describe('MenuitemComponent', () => {
  let component: MenuitemCardComponent;
  let fixture: ComponentFixture<MenuitemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuitemCardComponent]
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
