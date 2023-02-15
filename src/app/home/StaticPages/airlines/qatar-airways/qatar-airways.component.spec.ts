import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QatarAirwaysComponent } from './qatar-airways.component';

describe('QatarComponent', () => {
  let component: QatarAirwaysComponent;
  let fixture: ComponentFixture<QatarAirwaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QatarAirwaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QatarAirwaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
