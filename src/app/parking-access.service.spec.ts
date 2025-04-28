import { TestBed } from '@angular/core/testing';

import { ParkingAccessService } from './parking-access.service';

describe('ParkingAccessService', () => {
  let service: ParkingAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
