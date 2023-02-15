import { TestBed } from '@angular/core/testing';

import { TravellerDetailsService } from './traveller-details.service';

describe('TravellerDetailsService', () => {
  let service: TravellerDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravellerDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
