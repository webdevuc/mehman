import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurkishAirlinesComponent } from './turkish-airlines.component';

describe('TurkishAirlinesComponent', () => {
  let component: TurkishAirlinesComponent;
  let fixture: ComponentFixture<TurkishAirlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurkishAirlinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurkishAirlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
