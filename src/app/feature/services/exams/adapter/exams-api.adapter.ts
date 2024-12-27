import { Injectable } from '@angular/core';
import { Adapter } from '../../../../shared/components/business/interfaces/adapter/adapter';

@Injectable({
  providedIn: 'root'
})
export class ExamsAPIAdapter implements Adapter {

  constructor() { }
  
  successAdapt(data: any): any {
    return {
      status: 'success',
      message: data.message,
      meta: data.metadata,
      exams: data.exams,
    };
  }
  errAdapt(data: any): any {
    return {
      status: 'error',
      message: data.error.message,
    };
  }
}
