import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedContactUsComponent } from './shared-contact-us.component';

describe('SharedContactUsComponent', () => {
  let component: SharedContactUsComponent;
  let fixture: ComponentFixture<SharedContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedContactUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
