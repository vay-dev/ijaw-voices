import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { Onboarding } from './onboarding/onboarding';
import { Signup } from './signup/signup';
import { Login } from './login/login';


@NgModule({
  declarations: [
    Onboarding,
    Signup,
    Login
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
