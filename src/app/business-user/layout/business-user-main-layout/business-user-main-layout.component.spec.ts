import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessUserMainLayoutComponent } from './business-user-main-layout.component';


describe('BusinessUserMainLayoutComponent', () => {
  let component: BusinessUserMainLayoutComponent;
  let fixture: ComponentFixture<BusinessUserMainLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessUserMainLayoutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUserMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
