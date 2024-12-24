import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectAPIAdapter {

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
