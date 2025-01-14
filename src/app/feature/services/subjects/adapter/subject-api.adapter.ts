import { Injectable } from '@angular/core';
import { Adapter } from '../../../../shared/components/business/interfaces/adapter/adapter';

@Injectable({
  providedIn: 'root'
})
export class SubjectAPIAdapter  implements Adapter{

  constructor() { }

  successAdapt(data: any) {
    return {
      status: 'success',
      message: data.message,
      meta: data.metadata,
      subjects: data.subjects
    };
  }
  errAdapt(data: any) {
    return {
      status: 'error',
      message: data.error.message,
    };
  }
}
