import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirsialComponent } from './airsial.component';

describe('AirsialComponent', () => {
  let component: AirsialComponent;
  let fixture: ComponentFixture<AirsialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirsialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirsialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
