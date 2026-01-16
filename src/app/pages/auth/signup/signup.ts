import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SignupResponseInterface } from '../../../interfaces/auth/signup-response.interface';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  signUpForm: FormGroup;
  currentStep = 1;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
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

  // Custom validator for password match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  signUpWithGoogle(): void {
    console.log('Sign up with Google');
  }

  signUpWithFacebook(): void {
    console.log('Sign up with Facebook');
  }

  onNextStep(): void {
    if (this.currentStep === 1) {
      const emailControl = this.signUpForm.get('email');
      if (emailControl && emailControl.valid) {
        console.log('Email:', emailControl.value);
        this.currentStep = 2;
      } else {
        emailControl?.markAsTouched();
      }
    }
  }

  onSubmit(): void {
    this.isLoading.set(true);
    if (this.signUpForm.valid) {
      // Build the exact payload the backend expects
      const payload = {
        email: this.signUpForm.get('email')?.value.trim(),
        password: this.signUpForm.get('password')?.value,
        first_name: this.signUpForm.get('firstName')?.value.trim(),
        last_name: this.signUpForm.get('lastName')?.value.trim(),
        // avatar_id: null,   // optional — add later if you have avatar upload/picker
      };

      // Optional: log to verify what we're sending

      this.authService.register(payload).subscribe({
        next: (response: SignupResponseInterface) => {
          localStorage.setItem('pendingUserId', response.userId);
          this.isLoading.set(false);
          this.toastService.success(
            response.message || 'Registration successful! Please verify your email.'
          );
          this.router.navigate(['/auth/verify-otp'], { state: { userId: response.userId } });
        },
        error: (err: any) => {
          this.isLoading.set(false);
          this.handleError(err);
        },
      });
    } else {
      this.isLoading.set(false);
      // Mark all fields touched to show errors
      Object.keys(this.signUpForm.controls).forEach((key) => {
        this.signUpForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.currentStep = 1;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
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
      this.toastService.error(err.error?.message || 'Registration failed. Please try again.');
    }
  }
}
