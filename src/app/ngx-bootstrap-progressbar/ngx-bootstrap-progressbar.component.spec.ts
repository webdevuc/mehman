import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBootstrapProgressbarComponent } from './ngx-bootstrap-progressbar.component';

describe('NgxBootstrapProgressbarComponent', () => {
  let component: NgxBootstrapProgressbarComponent;
  let fixture: ComponentFixture<NgxBootstrapProgressbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxBootstrapProgressbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
