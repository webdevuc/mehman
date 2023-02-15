import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentHomeComponent } from './travel-agent-home.component';

describe('TravelAgentHomeComponent', () => {
  let component: TravelAgentHomeComponent;
  let fixture: ComponentFixture<TravelAgentHomeComponent>;

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
