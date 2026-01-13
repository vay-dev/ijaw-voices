import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  standalone: false,
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class Onboarding {
  currentStep = 0;
  steps = [0, 1, 2]; // for dots

  constructor(private router: Router) {}

  next() {
    if (this.currentStep < 2) {
      this.currentStep++;
    } else {
      // Navigate to login
      // e.g., this.router.navigate(['/auth/login']);
      console.log('Navigate to login');
    }
  }

  // ? navigate to signup
  register() {
    this.router.navigate(['/auth/signup']);
  }
  // ? navigate to login
  loginOrNext() {
    if (this.currentStep < 2) {
      this.currentStep++;
      return;
    }
    this.router.navigate(['/auth/login']);
  }

  get isLastStep(): boolean {
    return this.currentStep === 2;
  }
}
