import { Injectable } from '@angular/core';
import { Adapter } from '../../interface/adapter';

@Injectable({
  providedIn: 'root',
})
export class LoginAPIAdapter implements Adapter {
  constructor() {}

  successAdapt(data: any): any {
    return {
      status: 'success',
      message: data.message,
      token: data.token,
      role: data.user.role
    };
  }
  errAdapt(data: any): any {
    return {
      status: 'error',
      message: data.error.message
    }
  }
}
