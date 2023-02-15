import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaTabComponent } from './visa-tab.component';

describe('VisaTabComponent', () => {
  let component: VisaTabComponent;
  let fixture: ComponentFixture<VisaTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
