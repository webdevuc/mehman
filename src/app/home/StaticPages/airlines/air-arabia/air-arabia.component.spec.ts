import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirArabiaComponent } from './air-arabia.component';

describe('AirArabiaComponent', () => {
  let component: AirArabiaComponent;
  let fixture: ComponentFixture<AirArabiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirArabiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirArabiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
