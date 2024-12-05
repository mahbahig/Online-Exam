import { Injectable } from '@angular/core';
import { Adapter } from '../../interface/adapter';

@Injectable({
  providedIn: 'root'
})
export class RegisterAPIAdapter implements Adapter {

  constructor() { }

  successAdapt(data: any): any {
    return {
      status: 'success',
      message: data.message,
      token: data.token,
    };
  }
  errAdapt(data: any): any {
    return {
      status: 'error',
      message: data.error.message
    }
  }
}
