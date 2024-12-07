import { Injectable } from '@angular/core';
import { Adapter } from '../../interface/adapter';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailAPIAdapter implements Adapter {

  constructor() { }

  successAdapt(data: any) {
      return {
        status: 'success',
        message: data.message,
      }
  }
  errAdapt(data: any) {
      return{
        status: 'error',
        message: data.error.message
      }
  }
}
