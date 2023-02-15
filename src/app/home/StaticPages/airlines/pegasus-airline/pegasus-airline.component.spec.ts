import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegasusAirlineComponent } from './pegasus-airline.component';

describe('PegasusAirlineComponent', () => {
  let component: PegasusAirlineComponent;
  let fixture: ComponentFixture<PegasusAirlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegasusAirlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegasusAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
