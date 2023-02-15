import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentViewRequestComponent } from './travel-agent-view-request.component';

describe('TravelAgentViewRequestComponent', () => {
  let component: TravelAgentViewRequestComponent;
  let fixture: ComponentFixture<TravelAgentViewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelAgentViewRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelAgentViewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
