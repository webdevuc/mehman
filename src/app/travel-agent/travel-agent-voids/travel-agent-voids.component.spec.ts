import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentVoidsComponent } from './travel-agent-voids.component';

describe('TravelAgentVoidsComponent', () => {
  let component: TravelAgentVoidsComponent;
  let fixture: ComponentFixture<TravelAgentVoidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelAgentVoidsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelAgentVoidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
