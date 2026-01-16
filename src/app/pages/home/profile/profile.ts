import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  user: UserInterface | null = null;
  isLoggingOut = signal<boolean>(false);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserFromStorage();
  }

  loadUserFromStorage(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        this.user = JSON.parse(userString);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        this.user = null;
      }
    }
  }

  logout(): void {
    this.isLoggingOut.set(true);
    const refreshToken = this.authService.getRefreshToken();
    if (!refreshToken) {
      console.error('No refresh token found. Redirecting to login.');
      setTimeout(() => {
        this.clearStorageAndRedirect();
      }, 2000);
      return;
    }
    // Call logout API
    this.authService.logout(refreshToken).subscribe({
      next: () => {
        console.log('✅ Logout successful');
        setTimeout(() => {
          this.clearStorageAndRedirect();
        }, 2000);
      },
      error: (err) => {
        console.error('❌ Logout failed:', err);
        // Even if API fails, clear storage and redirect
        this.clearStorageAndRedirect();
      },
    });
  }

  clearStorageAndRedirect(): void {
    // Clear all auth-related data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    this.isLoggingOut.set(false);

    // Redirect to login
    this.router.navigate(['/auth/login']);
  }

  getInitials(): string {
    if (!this.user) return '?';
    const firstInitial = this.user.first_name?.charAt(0) || '';
    const lastInitial = this.user.last_name?.charAt(0) || '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  getFullName(): string {
    if (!this.user) return 'Unknown User';
    return `${this.user.first_name} ${this.user.last_name}`;
  }
}
