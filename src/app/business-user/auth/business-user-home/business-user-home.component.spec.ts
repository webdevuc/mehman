import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelAgentHomeComponent } from 'src/app/travel-agent/auth/travel-agent-home/travel-agent-home.component';



describe('TravelAgentHomeComponent', () => {
  let component: TravelAgentHomeComponent;
  let fixture: ComponentFixture<TravelAgentHomeComponent>;

  // tslint:disable-next-line: deprecation
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
