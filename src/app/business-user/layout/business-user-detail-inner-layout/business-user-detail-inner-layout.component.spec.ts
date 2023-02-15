import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelAgentDetailInnerLayoutComponent } from 'src/app/travel-agent/layout/travel-agent-detail-inner-layout/travel-agent-detail-inner-layout.component';


describe('TravelAgentDetailInnerLayoutComponent', () => {
  let component: TravelAgentDetailInnerLayoutComponent;
  let fixture: ComponentFixture<TravelAgentDetailInnerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgentDetailInnerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentDetailInnerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
