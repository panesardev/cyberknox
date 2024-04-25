import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthStore } from '../../auth/auth.store';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './index.component.html',
})
export default class IndexComponent {
  private auth = inject(AuthStore);

  authState$ = this.auth.authState$;

}
