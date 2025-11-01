import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/Authentication/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../Utils/error.handler';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;
  isLoginFormSubmitted: boolean = false;
  showError: boolean = false;
  makePasswordVisible: boolean = false;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private errorHandler = inject(ErrorHandlerService);

  constructor() {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.identifier, this.loginForm.value.password)
        .subscribe({
          next: () => {
            setTimeout(() => {
              this.router.navigateByUrl('/chat/new');
              this.isLoading = false;
            }, 200);
          },
          error: (err) => {
            this.errorMessage = this.errorHandler.handleError(err);
            this.isLoading = false;
          },
        });
    } else {
      this.isLoading = false;
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 300);
    }
  }

  togglePasswordVisibility() {
    this.makePasswordVisible = !this.makePasswordVisible;
  }
}
