import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SelectAuth } from '../../store/auth/auth.selectors';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    JsonPipe,
  ],
  templateUrl: './index.component.html',
})
export default class IndexComponent {
  private store = inject(Store);

  authState = this.store.selectSignal(SelectAuth);

}
