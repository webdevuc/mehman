import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessUserMainHeaderComponent } from './business-user-main-header.component';

describe('BusinessUserMainHeaderComponent', () => {
  let component: BusinessUserMainHeaderComponent;
  let fixture: ComponentFixture<BusinessUserMainHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessUserMainHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUserMainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
