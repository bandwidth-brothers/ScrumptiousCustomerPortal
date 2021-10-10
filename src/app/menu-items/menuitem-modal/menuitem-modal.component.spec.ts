import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuitemModalComponent } from './menuitem-modal.component';

describe('MenuitemModalComponent', () => {
  let component: MenuitemModalComponent;
  let fixture: ComponentFixture<MenuitemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuitemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuitemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
