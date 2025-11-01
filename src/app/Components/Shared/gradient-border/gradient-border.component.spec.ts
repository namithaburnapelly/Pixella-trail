import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientBorderComponent } from './gradient-border.component';

describe('GradientBorderComponent', () => {
  let component: GradientBorderComponent;
  let fixture: ComponentFixture<GradientBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradientBorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradientBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
