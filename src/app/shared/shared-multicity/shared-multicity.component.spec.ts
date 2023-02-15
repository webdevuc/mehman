import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedMulticityComponent } from './shared-multicity.component';

describe('SharedMulticityComponent', () => {
  let component: SharedMulticityComponent;
  let fixture: ComponentFixture<SharedMulticityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedMulticityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedMulticityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
