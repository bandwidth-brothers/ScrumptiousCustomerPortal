import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Location } from "@angular/common";

import { RestaurantListComponent } from './restaurant-list.component';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { MenuitemService } from 'src/app/core/services/menu-item.service';

import { Restaurant } from 'src/app/core/entities/restaurant';
import { RESTAURANTS } from 'src/app/shared/mocks/mock-restaurants';

import {
  routes
} from 'src/app/app-routing.module'
import { ToNumberPipe } from 'src/app/shared/pipes/to-number.pipe';
import { FilterByPriceCategoryPipe } from 'src/app/shared/pipes/filter-by-price-category.pipe';
import { FilterByRatingPipe } from 'src/app/shared/pipes/filter-by-rating.pipe';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RestaurantListComponent', () => {
  let component: RestaurantListComponent;
  let fixture: ComponentFixture<RestaurantListComponent>;
  let restaurantServiceSpy: RestaurantService
  let menuitemServiceSpy: MenuitemService

  let route: ActivatedRoute;
  let router: Router;
  let location: Location
  const mockRestaurants: Restaurant[] = RESTAURANTS

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [
        RestaurantListComponent,
        ToNumberPipe,
        FilterByPriceCategoryPipe,
        FilterByRatingPipe
      ],
      imports: [
        MatOptionModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    location = fixture.debugElement.injector.get(Location);
    restaurantServiceSpy = fixture.debugElement.injector.get(RestaurantService)
    menuitemServiceSpy = fixture.debugElement.injector.get(MenuitemService)
  });

  afterEach(() => {
    component.searchForm.reset();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate restaurants on init', () => {

    const fn = spyOn(restaurantServiceSpy, 'getAllRestaurants').and.returnValue(of(mockRestaurants))

    component.ngOnInit();

    expect(fn).toHaveBeenCalled();
    expect(component.restaurants).toBe(mockRestaurants)
  });

  it('should attempt to search menu item word', fakeAsync(() => {

    component.searchForm.setValue({ 'search': 'fries' });

    const search = component.searchForm.get('search')?.value;

    const searchResult = spyOn(menuitemServiceSpy, 'getAllRestaurantsFromMenuitemSearch').and.callFake(function (searchW) {
      return of([mockRestaurants[0], mockRestaurants[1]])
    })

    component.searchHandle();
    tick()
    expect(searchResult).toHaveBeenCalled();
    expect(searchResult).toHaveBeenCalledWith('name:' + search);

    expect(location.path()).toBe('/?search=name:' + search);
  }));

  it('should attempt to search empty menu item ', fakeAsync(() => {

    component.searchForm.setValue({ 'search': '' });

    const search = component.searchForm.get('search')?.value;

    const searchResult = spyOn(restaurantServiceSpy, 'getAllRestaurants').and.returnValue(of(mockRestaurants))

    component.searchHandle();
    tick()
    expect(searchResult).toHaveBeenCalled();
    expect(location.path()).toBe('/?search=name:');

  }));

});
