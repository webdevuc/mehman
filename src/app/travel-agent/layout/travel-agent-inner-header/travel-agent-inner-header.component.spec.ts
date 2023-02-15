import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentInnerHeaderComponent } from './travel-agent-inner-header.component';

describe('TravelAgentInnerHeaderComponent', () => {
  let component: TravelAgentInnerHeaderComponent;
  let fixture: ComponentFixture<TravelAgentInnerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAgentInnerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentInnerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
