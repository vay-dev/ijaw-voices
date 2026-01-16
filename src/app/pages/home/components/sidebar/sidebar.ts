import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Output() closeSidebar = new EventEmitter<void>();

  navItems: NavItem[] = [
    { label: 'Home', route: '/home', icon: 'home' },
    { label: 'Profile', route: '/home/profile', icon: 'profile' },
  ];

  constructor(private router: Router) {}

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
    this.closeSidebar.emit();
  }
}
