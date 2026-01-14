import { Injectable } from '@angular/core';
import { Environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignupRequestInterface } from '../interfaces/auth/signup-request.interface';
import { Observable } from 'rxjs';
import { VerifyOtpRequestInterface } from '../interfaces/auth/verifyotp-request.interface';
import { VerifyOtpResponseInterface } from '../interfaces/auth/verifyotp-response.interface';
import { SignupResponseInterface } from '../interfaces/auth/signup-response.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = Environment.baseUrl;

  constructor(private http: HttpClient) {}

  register(request: SignupRequestInterface): Observable<SignupResponseInterface> {
    return this.http.post<SignupResponseInterface>(`${this.apiUrl}/auth/register/`, request);
  }

  verifyOtp(request: VerifyOtpRequestInterface): Observable<VerifyOtpResponseInterface> {
    return this.http.post<VerifyOtpResponseInterface>(`${this.apiUrl}/auth/verify/`, request);
  }

  setTokensAndUser(accessToken: string, refreshToken: string, user: User): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
