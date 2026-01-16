import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  isSidebarOpen = signal<boolean>(true);

  toggleSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

  closeSidebar(): void {
    // Only close on mobile
    if (window.innerWidth < 1024) {
      this.isSidebarOpen.set(false);
    }
  }
}
