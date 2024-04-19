import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    JsonPipe,
  ],
  templateUrl: './index.component.html',
})
export default class IndexComponent {
  private auth = inject(AuthService);

  authState = this.auth.authState;

}
