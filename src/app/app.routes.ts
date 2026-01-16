import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/home/home-module').then((m) => m.HomeModule),
  },
];
