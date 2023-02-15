import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SereneAirComponent } from './serene-air.component';

describe('SereneAirComponent', () => {
  let component: SereneAirComponent;
  let fixture: ComponentFixture<SereneAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SereneAirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SereneAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
