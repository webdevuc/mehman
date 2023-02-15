import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrilankanAirlinesComponent } from './srilankan-airlines.component';

describe('SrilankanAirlinesComponent', () => {
  let component: SrilankanAirlinesComponent;
  let fixture: ComponentFixture<SrilankanAirlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrilankanAirlinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrilankanAirlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
