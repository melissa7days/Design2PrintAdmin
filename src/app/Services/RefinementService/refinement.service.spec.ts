import { TestBed } from '@angular/core/testing';

import { RefinementService } from './refinement.service';

describe('RefinementService', () => {
  let service: RefinementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefinementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
