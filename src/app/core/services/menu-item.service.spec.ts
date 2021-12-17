import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MenuitemService } from './menu-item.service';

describe('MenuitemService', () => {
  let service: MenuitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MenuitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
