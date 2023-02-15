import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUserInnerLayoutComponent } from './business-user-inner-layout.component';

describe('BusinessUserInnerLayoutComponent', () => {
  let component: BusinessUserInnerLayoutComponent;
  let fixture: ComponentFixture<BusinessUserInnerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessUserInnerLayoutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUserInnerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
