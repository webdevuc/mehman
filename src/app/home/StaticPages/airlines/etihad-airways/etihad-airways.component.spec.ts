import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtihadAirwaysComponent } from './etihad-airways.component';

describe('EtihadAirwaysComponent', () => {
  let component: EtihadAirwaysComponent;
  let fixture: ComponentFixture<EtihadAirwaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtihadAirwaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtihadAirwaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
