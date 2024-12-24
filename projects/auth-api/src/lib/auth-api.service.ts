import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthAPI } from './base/auth-api';
import { AuthEndPoint } from './enums/AuthAPI.endpoint';
import { catchError, map, Observable, of } from 'rxjs';
import { LoginAPIAdapter } from './adapter/login/login-api.adapter';
import { RegisterAPIAdapter } from './adapter/register/register-api.adapter';
import { VerifyEmailAPIAdapter } from './adapter/verifyEmail/verify-email-api.adapter';
import { VerifyCodeAPIAdapter } from './adapter/verifyCode/verify-code-api.adapter';
import { ResetPasswordAPIAdapter } from './adapter/resetPassword/reset-password-api.adapter';
import { LogoutAPIAdapter } from './adapter/logout/logout-api.adapter';
import { UserDataAPIAdapter } from './adapter/userData/user-data-api.adapter';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthAPI {

  constructor(private _httpClient : HttpClient, private _loginAPIAdapter : LoginAPIAdapter, private _registerAPIAdapter : RegisterAPIAdapter, 
    private _verifyEmailAPIAdapter : VerifyEmailAPIAdapter, private _verifyCodeAPIAdapter : VerifyCodeAPIAdapter, 
    private _resetPasswordAPIAdapter : ResetPasswordAPIAdapter, private _logoutAPIAdapter : LogoutAPIAdapter, private _userDataAPIAdapter : UserDataAPIAdapter
  ) { }

  login(data: any) {
    return this._httpClient.post(AuthEndPoint.LOGIN, data).pipe(
      map(res => this._loginAPIAdapter.successAdapt(res)),
      catchError(err => of(this._loginAPIAdapter.errAdapt(err)))
    );
  };
  register(data: any) {
    return this._httpClient.post(AuthEndPoint.REGISTER, data).pipe(
      map(res => this._registerAPIAdapter.successAdapt(res)),
      catchError(err => of(this._registerAPIAdapter.errAdapt(err)))
    );
  };
  verifyEmail(data: any) {
    return this._httpClient.post(AuthEndPoint.FORGET_PASSWORD, data).pipe(
      map(res => this._verifyEmailAPIAdapter.successAdapt(res)),
      catchError(err => of(this._verifyEmailAPIAdapter.errAdapt(err)))
    );
  };
  verifyCode(data: any): Observable<any> {
    return this._httpClient.post(AuthEndPoint.VERIFY_CODE, data).pipe(
      map(res => this._verifyCodeAPIAdapter.successAdapt(res)),
      catchError(err => of(this._verifyCodeAPIAdapter.errAdapt(err)))
    );
  };
  resetPassword(data: any): Observable<any> {
    return this._httpClient.put(AuthEndPoint.RESET_PASSWORD, data).pipe(
      map(res => this._resetPasswordAPIAdapter.successAdapt(res)),
      catchError(err => of(this._resetPasswordAPIAdapter.errAdapt(err)))
    );
  };
  logout(): Observable<any> {
    return this._httpClient.get(AuthEndPoint.LOGOUT).pipe(
      map(res => this._logoutAPIAdapter.successAdapt(res)),
      catchError(err => of(this._logoutAPIAdapter.errAdapt(err)))
    );
  };
  getUserData(): Observable<any> {
    return this._httpClient.get(AuthEndPoint.USER_INFO).pipe(
      map(res => this._userDataAPIAdapter.successAdapt(res)),
      catchError(err => of(this._userDataAPIAdapter.errAdapt(err)))
    );
  };
}