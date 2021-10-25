import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftDrawerSidenavComponent } from './left-drawer-sidenav.component';

describe('LeftDrawerSidenavComponent', () => {
  let component: LeftDrawerSidenavComponent;
  let fixture: ComponentFixture<LeftDrawerSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftDrawerSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftDrawerSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
