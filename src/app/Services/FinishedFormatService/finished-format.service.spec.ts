import { TestBed } from '@angular/core/testing';

import { FinishedFormatService } from './finished-format.service';

describe('FinishedFormatService', () => {
  let service: FinishedFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinishedFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
