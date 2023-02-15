import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaudiaComponent } from './saudia.component';

describe('SaudiaComponent', () => {
  let component: SaudiaComponent;
  let fixture: ComponentFixture<SaudiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaudiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaudiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
