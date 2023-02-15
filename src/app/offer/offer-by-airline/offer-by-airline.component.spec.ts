import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferByAirlineComponent } from './offer-by-airline.component';

describe('OfferByAirlineComponent', () => {
  let component: OfferByAirlineComponent;
  let fixture: ComponentFixture<OfferByAirlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferByAirlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferByAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
