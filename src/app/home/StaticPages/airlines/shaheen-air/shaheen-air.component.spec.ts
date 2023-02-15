import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaheenAirComponent } from './shaheen-air.component';

describe('ShaheenAirComponent', () => {
  let component: ShaheenAirComponent;
  let fixture: ComponentFixture<ShaheenAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShaheenAirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShaheenAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
