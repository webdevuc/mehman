/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelAgentContactUsComponent } from 'src/app/travel-agent/travel-agent-contact-us/travel-agent-contact-us.component';
describe('TravelAgentContactUsComponent', () => {
  let component: TravelAgentContactUsComponent;
  let fixture: ComponentFixture<TravelAgentContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgentContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
