import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
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
