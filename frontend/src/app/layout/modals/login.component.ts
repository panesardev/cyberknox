import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login } from '../../store/auth/auth.actions';
import { BaseModalComponent } from './base.modal.component';
import { Modal } from './modal.class';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BaseModalComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  template: `
    <app-base-modal heading="Login">
      <form [formGroup]="loginForm" (submit)="login()" class="grid gap-3">
        <fieldset>
          <label>Enter email</label>
          <input type="email" formControlName="email" placeholder="john.wick123@example.com">
        </fieldset>
        <fieldset>
          <label>Enter password</label>
          <input type="email" formControlName="password" placeholder="your password">
        </fieldset>
        <div class="py-2 text-center">
          <a routerLink="/create-account" class="text-primary hover:underline" (click)="modal.close()">Create new account instead</a>
        </div>
        <div class="grid">
          <button class="primary" type="submit">Login</button>
        </div>
      </form>
    </app-base-modal>
  `,
})
export class LoginComponent extends Modal {
  private store = inject(Store);

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(Login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }));      
    }
  }

}
