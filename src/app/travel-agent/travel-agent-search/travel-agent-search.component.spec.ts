import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentSearchComponent } from './travel-agent-search.component';

describe('TravelAgentSearchComponent', () => {
  let component: TravelAgentSearchComponent;
  let fixture: ComponentFixture<TravelAgentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelAgentSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
