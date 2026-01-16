import { Component, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LoginRequestInterface } from '../../../interfaces/auth/login-request.interface';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { LoginResponseInterface } from '../../../interfaces/auth/login-response.interface';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  isLoading = signal<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
    });
  }

  signUpWithGoogle(): void {
    console.log('Sign up with Google');
  }

  signUpWithFacebook(): void {
    console.log('Sign up with Facebook');
  }

  // Custom validator for password strength
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    const hasMinLength = value.length >= 6;

    const passwordValid = hasUpperCase && hasSpecialChar && hasMinLength;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  onSubmit(): void {
    this.isLoading.set(true);
    if (this.loginForm.valid) {
      // Build the exact payload the backend expects
      const payload: LoginRequestInterface = {
        email: this.loginForm.get('email')?.value.trim(),
        password: this.loginForm.get('password')?.value,
      };

      // Optional: log to verify what we're sending

      this.authService.login(payload).subscribe({
        next: (response: LoginResponseInterface) => {
          console.log('Login successful:', response);
          this.isLoading.set(false);
          this.toastService.success('Login successful!');
          this.router.navigate(['/home']);
          this.authService.setTokensAndUser(
            response.accessToken,
            response.refreshToken,
            response.user
          );
        },
        error: (err: any) => {
          console.error('Login failed:', err);
          this.isLoading.set(false);
          this.handleError(err);
        },
      });
    } else {
      this.isLoading.set(false);
      // Mark all fields touched to show errors
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  private handleError(err: any): void {
    if (err.status === 429) {
      const detail = err.error?.detail || '';
      const match = detail.match(/(\d+)\s+seconds/);
      if (match) {
        const seconds = parseInt(match[1]);
        const minutes = Math.ceil(seconds / 60);
        this.toastService.error(
          `Too many requests. Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}.`
        );
      } else {
        this.toastService.error('Too many requests. Please try again later.');
      }
    } else {
      this.toastService.error(err.error?.message || 'Login failed. Please try again.');
    }
  }
}
