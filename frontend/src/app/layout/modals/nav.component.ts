import { Component } from '@angular/core';
import { BaseModalComponent } from './base.modal.component';
import { RouterLink } from '@angular/router';
import { Modal } from './modal.class';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    BaseModalComponent,
    RouterLink,
  ],
  template: `
    <app-base-modal heading="Navigation">
      <div>
        <a class="hover:underline hover:text-primary" routerLink="/" routerLinkActive="text-primary">Home</a>
      </div>
      <div>
        <a class="hover:underline hover:text-primary" routerLink="/dashboard" routerLinkActive="text-primary">Dashboard</a>
      </div>
      <div>
        <a class="hover:underline hover:text-primary" routerLink="/profile" routerLinkActive="text-primary">Profile</a>
      </div>
    </app-base-modal>
  `,
})
export class NavComponent extends Modal {

}
