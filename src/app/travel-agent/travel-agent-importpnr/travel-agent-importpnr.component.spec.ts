import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentImportpnrComponent } from './travel-agent-importpnr.component';

describe('TravelAgentImportpnrComponent', () => {
  let component: TravelAgentImportpnrComponent;
  let fixture: ComponentFixture<TravelAgentImportpnrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelAgentImportpnrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAgentImportpnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
