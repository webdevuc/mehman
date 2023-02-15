import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelAgentMainHeaderComponent } from './travel-agent-main-header.component';

describe('TravelAgentMainHeaderComponent', () => {
  let component: TravelAgentMainHeaderComponent;
  let fixture: ComponentFixture<TravelAgentMainHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgentMainHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentMainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
