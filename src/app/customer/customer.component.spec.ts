import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Address } from '../address';
import { Customer } from '../customer';
import { CustomerService } from '../shared/services/customer.service';

import { CustomerComponent } from './customer.component';
import { of, throwError } from 'rxjs';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let customerServiceSpy: CustomerService;

  const expectedFormFields = [
    'firstName',
    'lastName',
    'addrLine1',
    'addrLine2',
    'city',
    'state',
    'zip',
    'phone',
    'loyaltyPoints',
  ];

  const mockAddrs: Address[] = [
    {
      addressId: "30000000-0000-0000-0000-000000000000",
      line1: '123 Fake St',
      line2: '#1',
      city: 'Anywhere',
      state: 'VA',
      zip: '12345',
    },
  ];
  const mockCustomer: Customer = {
    customerId: '00000000-0000-0000-0000-000000000000',
    firstName: 'Foo',
    lastName: 'Testcustomer',
    addresses: mockAddrs,
    loyaltyPoints: 1,
    phone: '555-555-1234',
    addrLine1: '123 Fake St',
    addrLine2: '#1',
    city: 'Anywhere',
    state: 'VA',
    zip: '12345',
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    customerServiceSpy = fixture.debugElement.injector.get(CustomerService);
  });

  afterEach(() => {
    component.customerProfileForm.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checkIsValidCustomer true on valid customer', () => {
    expect(component.checkIsValidCustomer(mockCustomer)).toBeTrue();
  });

  it('check should set the customer', () => {
    component.setCustomer(mockCustomer);
    expect((component.customer as Customer).firstName).toEqual('Foo');
    expect((component.customer as Customer).lastName).toEqual('Testcustomer');
    expect((component.customer as Customer).phone).toEqual('555-555-1234');
    expect((component.customer as Customer).loyaltyPoints).toEqual(1);
  });

  it('setCustomer should call fillThisCustomerAddr, should fill in customer address', () => {
    component.setCustomer(mockCustomer);
    expect((component.customer as Customer).addrLine1).toEqual('123 Fake St');
    expect((component.customer as Customer).addrLine2).toEqual('#1');
    expect((component.customer as Customer).city).toEqual('Anywhere');
    expect((component.customer as Customer).state).toEqual('VA');
    expect((component.customer as Customer).zip).toEqual('12345');
  });

  it('form should create', () => {
    expect(component.customerProfileForm).toBeTruthy();
  });

  it('form should have all expected fields', () => {
    expectedFormFields.forEach((field) => {
      expect(component.customerProfileForm.contains(field)).toBeTrue();
    });
  });

  it('form zip code field should be invalid if bad zip code entered', () => {
    component.customerProfileForm.get('zip')!.setValue('0');
    component.customerProfileForm.get('zip')!.markAsTouched();

    expect(component.customerProfileForm.get('zip')!.invalid).toBeTrue();
  });


  it('form should be valid when set with a customer', () => {
    component.setCustomer(mockCustomer);

    expect(component.customerProfileForm.invalid).toBeFalse();
  });


  it('should clear error message #onCloseAlert', () => {
    component.onCloseAlert();
    expect(component.modalMsg).toBeFalsy();
  });

  it('should call #updateCustomer on valid customer', () => {
    const fn = spyOn(customerServiceSpy, 'updateCustomer').and.returnValue(
      of(mockCustomer)
    );
    const fn2 = spyOn(component, 'checkIsValidCustomer').and.returnValue(true);
    component.setCustomer(mockCustomer);
    component.updateCustomer();
    expect(fn).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(component.modalMsg).toBeTruthy();
  });

  it('should have a message if  update failed', () => {
    const fn = spyOn(customerServiceSpy, 'updateCustomer').and.returnValue(
      throwError('SOME ERROR')
    );
    const fn2 = spyOn(component, 'checkIsValidCustomer').and.returnValue(true);
    component.setCustomer(mockCustomer);
    component.updateCustomer();
    expect(fn).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(component.modalMsg).toBeTruthy();
  });

});
