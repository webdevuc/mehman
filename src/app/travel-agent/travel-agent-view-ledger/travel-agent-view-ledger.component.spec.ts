import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentViewLedgerComponent } from './travel-agent-view-ledger.component';

describe('TravelAgentViewLedgerComponent', () => {
  let component: TravelAgentViewLedgerComponent;
  let fixture: ComponentFixture<TravelAgentViewLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelAgentViewLedgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelAgentViewLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
