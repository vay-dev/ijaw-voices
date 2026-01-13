import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing-module';
import { Onboarding } from './onboarding/onboarding';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { VerifyOtp } from './verify-otp/verify-otp';


@NgModule({
  declarations: [
    Onboarding,
    Signup,
    Login,
    VerifyOtp
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
