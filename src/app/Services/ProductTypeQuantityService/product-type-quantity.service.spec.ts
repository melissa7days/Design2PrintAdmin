import { TestBed } from '@angular/core/testing';

import { ProductTypeQuantityService } from './product-type-quantity.service';

describe('ProductTypeQuantityService', () => {
  let service: ProductTypeQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductTypeQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
