import { SubjectAPIAdapter } from './adapter/subject-api.adapter';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private _httpClient : HttpClient, private _subjectAPIAdapter :  SubjectAPIAdapter) { }
  
  getSubjects(): Observable<any> {
    return this._httpClient.get(`${environment.baseURL}subjects`).pipe(
      map(res => this._subjectAPIAdapter.successAdapt(res)),
      catchError(err => of(this._subjectAPIAdapter.errAdapt(err)))
    );
  }
  getSubjectById(subjectId: string | null): Observable<any> {
    return this._httpClient.get(`${environment.baseURL}subjects/${subjectId}`)
  };
}
