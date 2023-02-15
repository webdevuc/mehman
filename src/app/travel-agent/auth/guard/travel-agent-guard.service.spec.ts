import { TestBed } from '@angular/core/testing';
import { TravelAgentGuardService } from './travel-agent-guard.service';


describe('TravelAgentGuardService', () => {
  let service: TravelAgentGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelAgentGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
