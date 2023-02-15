/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelAgentBookingDetailComponent } from 'src/app/travel-agent/travel-agent-booking-detail/travel-agent-booking-detail.component';
describe('TravelAgentBookingDetailComponent', () => {
  let component: TravelAgentBookingDetailComponent;
  let fixture: ComponentFixture<TravelAgentBookingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgentBookingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
