import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  signUpWithGoogle(): void {
    console.log('Sign up with Google');
  }

  signUpWithFacebook(): void {
    console.log('Sign up with Facebook');
  }

  onSubmit(): void {
    console.log('Signup form submitted');
  }
}
