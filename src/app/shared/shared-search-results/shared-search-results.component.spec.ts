import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSearchResultsComponent } from './shared-search-results.component';

describe('SharedSearchResultsComponent', () => {
  let component: SharedSearchResultsComponent;
  let fixture: ComponentFixture<SharedSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedSearchResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
