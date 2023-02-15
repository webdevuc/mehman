import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuwaitAirwaysComponent } from './kuwait-airways.component';

describe('KuwaitAirwaysComponent', () => {
  let component: KuwaitAirwaysComponent;
  let fixture: ComponentFixture<KuwaitAirwaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KuwaitAirwaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KuwaitAirwaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
