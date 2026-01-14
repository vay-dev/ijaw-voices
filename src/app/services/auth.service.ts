import { Injectable } from '@angular/core';
import { Environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignupRequestInterface } from '../interfaces/auth/signup-request.interface';
import { Observable, switchMap, tap } from 'rxjs';
import { VerifyOtpRequestInterface } from '../interfaces/auth/verifyotp-request.interface';
import { VerifyOtpResponseInterface } from '../interfaces/auth/verifyotp-response.interface';
import { SignupResponseInterface } from '../interfaces/auth/signup-response.interface';
import { User } from '../interfaces/user.interface';
import { BaseResponseInterface } from '../interfaces/base-response.interface';
import { LoginRequestInterface } from '../interfaces/auth/login-request.interface';

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

  logout(refreshToken: string): Observable<BaseResponseInterface> {
    return this.http.post<BaseResponseInterface>(`${this.apiUrl}/auth/logout/`, {
      refreshToken: refreshToken,
    });
  }

  login(payload: LoginRequestInterface): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login/`, payload);
  }

  setTokensAndUser(accessToken: string, refreshToken: string, user: User): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getUser(): User | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        return JSON.parse(userString);
      } catch {
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<{ accessToken: string }>('/api/auth/refresh', { refreshToken }).pipe(
      tap((res) => localStorage.setItem('access_token', res.accessToken)),
      switchMap((res) => [res.accessToken])
    );
  }
}
