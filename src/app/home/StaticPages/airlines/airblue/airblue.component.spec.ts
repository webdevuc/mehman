import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirblueComponent } from './airblue.component';

describe('AirblueComponent', () => {
  let component: AirblueComponent;
  let fixture: ComponentFixture<AirblueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirblueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirblueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
