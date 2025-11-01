import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredFieldAlertDivComponent } from './required-field-alert-div.component';

describe('RequiredFieldAlertDivComponent', () => {
  let component: RequiredFieldAlertDivComponent;
  let fixture: ComponentFixture<RequiredFieldAlertDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequiredFieldAlertDivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredFieldAlertDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
