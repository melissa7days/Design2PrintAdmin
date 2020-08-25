import { TestBed } from '@angular/core/testing';

import { BookBindingService } from './book-binding.service';

describe('BookBindingService', () => {
  let service: BookBindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookBindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
