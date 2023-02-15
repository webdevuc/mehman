import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentInnerLayoutComponent } from './travel-agent-inner-layout.component';

describe('TravelAgentInnerLayoutComponent', () => {
  let component: TravelAgentInnerLayoutComponent;
  let fixture: ComponentFixture<TravelAgentInnerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgentInnerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentInnerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
