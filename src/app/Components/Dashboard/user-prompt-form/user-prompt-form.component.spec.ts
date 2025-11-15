import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPromptFormComponent } from './user-prompt-form.component';

describe('UserPromptFormComponent', () => {
  let component: UserPromptFormComponent;
  let fixture: ComponentFixture<UserPromptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPromptFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPromptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
