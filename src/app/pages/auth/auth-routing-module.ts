import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Onboarding } from './onboarding/onboarding';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { VerifyOtp } from './verify-otp/verify-otp';

const routes: Routes = [
  { path: '', component: Onboarding },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'verify-otp', component: VerifyOtp },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
