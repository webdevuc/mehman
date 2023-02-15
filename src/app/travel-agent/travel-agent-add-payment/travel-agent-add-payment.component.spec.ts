import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentAddPaymentComponent } from './travel-agent-add-payment.component';

describe('TravelAgentAddPaymentComponent', () => {
  let component: TravelAgentAddPaymentComponent;
  let fixture: ComponentFixture<TravelAgentAddPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelAgentAddPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelAgentAddPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
