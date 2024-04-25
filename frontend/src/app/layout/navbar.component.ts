import { Component, inject } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BRAND } from '../app.constants';
import { NavComponent } from './modals/nav.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <header class="bg-secondary px-6 py-4 md:py-6 fixed top-0 w-full">
      <nav class="max-w-7xl flex justify-between items-center gap-6 md:gap-8 mx-auto">
        <div class="flex items-center gap-6 md:gap-8">
          <div class="block md:hidden" (click)="openNavModal()">
            <svg class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><path d="M24,3.5c0,.83-.67,1.5-1.5,1.5H1.5c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5H22.5c.83,0,1.5,.67,1.5,1.5ZM6.5,20H1.5c-.83,0-1.5,.67-1.5,1.5s.67,1.5,1.5,1.5H6.5c.83,0,1.5-.67,1.5-1.5s-.67-1.5-1.5-1.5ZM14.5,11H1.5c-.83,0-1.5,.67-1.5,1.5s.67,1.5,1.5,1.5H14.5c.83,0,1.5-.67,1.5-1.5s-.67-1.5-1.5-1.5Z"/></svg>
          </div>
          <div><a routerLink="/" class="heading text-2xl md:text-3xl">{{ brand }}</a></div>
        </div>
        <div class="hidden md:flex items-center gap-6 md:gap-8">
          <div>
            <a class="hover:underline hover:text-primary" routerLink="/dashboard" routerLinkActive="text-primary">Dashboard</a>
          </div>
          <div>
            <a class="hover:underline hover:text-primary" routerLink="/profile" routerLinkActive="text-primary">Profile</a>
          </div>
          <div>
            <button class="primary py-2 px-6 rounded-full" routerLink="/login">Login</button>
          </div>
        </div>
        <div class="block md:hidden">
          <div>
            <button class="primary py-1 px-4 rounded-full" routerLink="/login">Login</button>
          </div>
        </div>
      </nav>
    </header>
  `,
})
export class NavbarComponent {
  private modal = inject(ModalService);

  brand = BRAND;

  openNavModal() {
    this.modal.open(NavComponent);
  }
}
