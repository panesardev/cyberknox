import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginAction } from '../../auth/auth.actions';
import { AuthStore } from '../../auth/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  private authStore = inject(AuthStore);

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  login() {
    if (this.loginForm.valid) {
      this.authStore.dispatch(new LoginAction({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }));
    }
  }
}
