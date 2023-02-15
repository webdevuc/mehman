import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelAgentBookingsComponent } from 'src/app/travel-agent/travel-agent-bookings/travel-agent-bookings.component';

describe('TravelAgentBookingsComponent', () => {
  let component: TravelAgentBookingsComponent;
  let fixture: ComponentFixture<TravelAgentBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgentBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
