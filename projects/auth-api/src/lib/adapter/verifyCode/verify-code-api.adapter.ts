import { Injectable } from '@angular/core';
import { Adapter } from '../../interface/adapter';

@Injectable({
  providedIn: 'root'
})
export class VerifyCodeAPIAdapter implements Adapter {

  constructor() { }

  successAdapt(data: any): any {
    return {
      status: 'success',
      message: data.status
    };
  }
  errAdapt(data: any): any {
    return {
      status: 'error',
      message: data.error.message
    };
  }
}
