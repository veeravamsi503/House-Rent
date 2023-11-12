import { TestBed } from '@angular/core/testing';

import { PropertyOwnerService } from './property-owner.service';

describe('PropertyOwnerService', () => {
  let service: PropertyOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
