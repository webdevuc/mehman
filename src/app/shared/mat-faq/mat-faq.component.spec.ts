import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFaqComponent } from './mat-faq.component';

describe('MatFaqComponent', () => {
  let component: MatFaqComponent;
  let fixture: ComponentFixture<MatFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
