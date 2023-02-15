import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyRefundsAndVoidsComponent } from './apply-refunds-and-voids.component';

describe('ApplyRefundsAndVoidsComponent', () => {
  let component: ApplyRefundsAndVoidsComponent;
  let fixture: ComponentFixture<ApplyRefundsAndVoidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyRefundsAndVoidsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyRefundsAndVoidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
