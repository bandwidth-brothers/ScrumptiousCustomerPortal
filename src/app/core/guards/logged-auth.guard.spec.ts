import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoggedAuthGuard } from './logged-auth.guard';

describe('LoggedAuthGuard', () => {
  let guard: LoggedAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(LoggedAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
