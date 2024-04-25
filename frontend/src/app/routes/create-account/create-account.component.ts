import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { AuthStore } from '../../auth/auth.store';
import { CreateAccountAction } from '../../auth/auth.actions';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './create-account.component.html',
})
export default class CreateAccountComponent {
  private authStore = inject(AuthStore);

  createAccountForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    houseNumber: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  createAccount() {
    if (this.createAccountForm.valid || true) {
      this.authStore.dispatch(new CreateAccountAction({
        user: {
          firstName: this.createAccountForm.value.firstName,
          lastName: this.createAccountForm.value.lastName,
          email: this.createAccountForm.value.email,
          password: this.createAccountForm.value.password,
        },
        address: {
          houseNumber: this.createAccountForm.value.houseNumber,
          street: this.createAccountForm.value.street,
          city: this.createAccountForm.value.city,
          country: this.createAccountForm.value.country,
          postalCode: this.createAccountForm.value.postalCode,
        },
      }));
    }
  }

} 
