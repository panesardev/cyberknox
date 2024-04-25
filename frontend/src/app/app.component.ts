import { Component, inject, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
  ],
  template: `
    <app-navbar/>
    <main class="max-w-7xl mx-auto px-6 py-24 md:py-28">
      <router-outlet/>
    </main>
  `,
})
export class AppComponent {
  private container = inject(ViewContainerRef);
  private modal = inject(ModalService);
  
  constructor() {
    this.modal.setContainer(this.container);
  }

}
