import { Routes } from '@angular/router';
import IndexComponent from './routes/index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
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
