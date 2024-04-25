import { Routes } from '@angular/router';
import DashboardComponent from './routes/dashboard/dashboard.component';
import { isAuthenticated } from './auth/auth.guard';
import IndexComponent from './routes/index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./routes/dashboard/dashboard.component'),
    canActivate: [isAuthenticated()],
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login/login.component'),
  },
  {
    path: 'create-account',
    loadComponent: () => import('./routes/create-account/create-account.component'),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  }
];
