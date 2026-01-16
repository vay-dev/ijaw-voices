import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from './toast.service';
import { Subscription } from 'rxjs';

interface ToastWithState extends Toast {
  isLeaving?: boolean;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: ToastWithState[] = [];
  private subscription?: Subscription;

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toast$.subscribe((toast) => {
      setTimeout(() => {
        this.toasts = [...this.toasts, { ...toast, isLeaving: false }];
        this.cdr.detectChanges();

        // Start fade out after 2.5 seconds
        setTimeout(() => {
          this.startRemoveToast(toast.id);
        }, 2500);
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  startRemoveToast(id: string): void {
    // Add leaving class
    const toast = this.toasts.find((t) => t.id === id);
    if (toast) {
      toast.isLeaving = true;
      this.cdr.detectChanges();
    }

    // Remove from DOM after transition completes (300ms)
    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t.id !== id);
      this.cdr.detectChanges();
    }, 300);
  }

  getIcon(type: string): string {
    const icons: Record<string, string> = {
      success: 'fa-solid fa-circle-check',
      error: 'fa-solid fa-circle-xmark',
      warning: 'fa-solid fa-triangle-exclamation',
      info: 'fa-solid fa-circle-info',
    };
    return icons[type] || 'fa-solid fa-circle-info';
  }
}
