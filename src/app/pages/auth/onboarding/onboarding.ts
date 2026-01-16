import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  standalone: false,
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
})
export class Onboarding {
  @ViewChild('carousel') carousel!: ElementRef;

  currentStep = 0;
  steps = [0, 1, 2];
  touchStartX = 0;
  touchEndX = 0;

  slides = [
    {
      title: 'Bring Ijaw to Life',
      description: 'Build confidence in your mother tongue with bite-sized lessons.',
      image: '/images/splash1.png',
      alt: 'Traditional Ijaw cultural display',
    },
    {
      title: 'Choose Your Dialect',
      description: 'Kalabari, Nembe, Izon — learn in the variety you connect with most.',
      image: '/images/splash2.png',
      alt: 'Ijaw dialect diversity',
    },
    {
      title: 'Practice & Grow',
      description: 'Speak with confidence, test your knowledge, and track your progress.',
      image: '/images/splash3.png',
      alt: 'Learning progress visualization',
    },
  ];

  constructor(private router: Router) {}

  goToSlide(index: number) {
    this.currentStep = index;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && this.currentStep < 2) {
        // Swipe left - next slide
        this.currentStep++;
      } else if (diff < 0 && this.currentStep > 0) {
        // Swipe right - previous slide
        this.currentStep--;
      }
    }
  }

  register() {
    this.router.navigate(['/auth/signup']);
  }

  loginOrNext() {
    if (this.currentStep < 2) {
      this.currentStep++;
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  get isLastStep(): boolean {
    return this.currentStep === 2;
  }
}
