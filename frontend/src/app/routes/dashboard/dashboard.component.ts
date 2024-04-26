import { Component, inject } from '@angular/core';
import { AuthStore } from '../../auth/auth.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {
  private auth = inject(AuthStore);

  authState$ = this.auth.state$;

  
}
