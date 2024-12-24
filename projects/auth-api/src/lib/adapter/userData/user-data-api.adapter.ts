import { Injectable } from '@angular/core';
import { Adapter } from '../../interface/adapter';

@Injectable({
  providedIn: 'root'
})
export class UserDataAPIAdapter implements Adapter {

  constructor() { }

  successAdapt(data: any) {
    return {
      status: 'success',
      message: data.message,
      userId: data.user._id,
      username: data.user.username,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      role: data.user.role,
      email: data.user.email,
      phone: data.user.phone
    };
  };

  errAdapt(data: any) {
    return {
      status: 'error',
      message: data.error.message
    };
  };
}
