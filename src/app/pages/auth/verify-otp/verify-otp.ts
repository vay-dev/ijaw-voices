import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  standalone: false,
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss',
})
export class VerifyOtp {
  otpForm: FormGroup;
  otpInputs: string[] = ['', '', '', '', '', ''];
  errorMessage = '';
  countdown = 20;
  private countdownInterval: any;

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      otp2: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      otp3: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      otp4: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      otp5: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      otp6: ['', [Validators.required, Validators.pattern(/^\d$/)]],
    });

    this.startCountdown();
  }

  startCountdown(): void {
    this.countdown = 20;
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  onOtpInput(event: any, index: number): void {
    const input = event.target;
    const value = input.value;

    // Only allow single digit
    if (value.length > 1) {
      input.value = value.charAt(0);
      this.otpInputs[index] = value.charAt(0);
    } else {
      this.otpInputs[index] = value;
    }

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 2}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }

    // Clear error when user starts typing
    if (this.errorMessage) {
      this.errorMessage = '';
    }

    // Auto-submit when all fields are filled
    if (index === 5 && value) {
      this.verifyOtp();
    }
  }

  onOtpKeyDown(event: KeyboardEvent, index: number): void {
    // Handle backspace to move to previous input
    if (event.key === 'Backspace' && !this.otpInputs[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    if (pastedData && /^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      digits.forEach((digit, index) => {
        if (index < 6) {
          this.otpInputs[index] = digit;
          const input = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
          if (input) {
            input.value = digit;
          }
        }
      });
      // Focus last input and verify
      const lastInput = document.getElementById('otp-6');
      if (lastInput) {
        (lastInput as HTMLInputElement).focus();
        this.verifyOtp();
      }
    }
  }

  verifyOtp(): void {
    const otpCode = this.otpInputs.join('');
    if (otpCode.length === 6) {
      console.log('OTP Code:', otpCode);

      // Simulate verification (replace with actual API call)
      // For demo purposes, any 6-digit code except '532409' is valid
      if (otpCode === '532409') {
        this.errorMessage = 'Wrong code, please try again';
        // Clear inputs on error
        this.otpInputs = ['', '', '', '', '', ''];
        for (let i = 1; i <= 6; i++) {
          const input = document.getElementById(`otp-${i}`) as HTMLInputElement;
          if (input) {
            input.value = '';
          }
        }
        // Focus first input
        const firstInput = document.getElementById('otp-1');
        if (firstInput) {
          (firstInput as HTMLInputElement).focus();
        }
      } else {
        // Success - navigate to next page or show success message
        console.log('OTP Verified Successfully!');
      }
    }
  }

  resendCode(): void {
    if (this.countdown <= 0) {
      console.log('Resending OTP code...');
      this.startCountdown();
      this.errorMessage = '';
      this.otpInputs = ['', '', '', '', '', ''];
      for (let i = 1; i <= 6; i++) {
        const input = document.getElementById(`otp-${i}`) as HTMLInputElement;
        if (input) {
          input.value = '';
        }
      }
    }
  }

  goBack(): void {
    // Navigate back to signup
    console.log('Going back...');
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
