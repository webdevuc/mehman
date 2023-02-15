import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentMainLayoutComponent } from './travel-agent-main-layout.component';

describe('TravelAgentMainLayoutComponent', () => {
  let component: TravelAgentMainLayoutComponent;
  let fixture: ComponentFixture<TravelAgentMainLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgentMainLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
