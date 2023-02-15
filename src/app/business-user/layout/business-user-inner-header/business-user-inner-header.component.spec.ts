import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUserInnerHeaderComponent } from './business-user-inner-header.component';

describe('BusinessUserInnerHeaderComponent', () => {
  let component: BusinessUserInnerHeaderComponent;
  let fixture: ComponentFixture<BusinessUserInnerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessUserInnerHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUserInnerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
