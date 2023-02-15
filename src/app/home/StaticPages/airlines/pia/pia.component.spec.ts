import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIAComponent } from './pia.component';

describe('PIAComponent', () => {
  let component: PIAComponent;
  let fixture: ComponentFixture<PIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PIAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
