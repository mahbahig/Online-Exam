import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthAPI } from './base/auth-api';
import { AuthEndPoint } from './enums/AuthAPI.endpoint';
import { catchError, map, of } from 'rxjs';
import { LoginAPIAdapter } from './adapter/login/login-api.adapter';
import { RegisterAPIAdapter } from './adapter/register/register-api.adapter';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthAPI {

  constructor(private _httpClient : HttpClient, private _loginAPIAdapter : LoginAPIAdapter, private _registerAPIAdapter : RegisterAPIAdapter) { }

  login(data: any) {
    return this._httpClient.post(AuthEndPoint.LOGIN, data).pipe(
      map(res => this._loginAPIAdapter.successAdapt(res)),
      catchError(err => of(this._loginAPIAdapter.errAdapt(err)))
    );
  }
  register(data: any) {
    return this._httpClient.post(AuthEndPoint.REGISTER, data).pipe(
      map(res => this._registerAPIAdapter.successAdapt(res)),
      catchError(err => of(this._registerAPIAdapter.errAdapt(err)))
    );
  }

}
