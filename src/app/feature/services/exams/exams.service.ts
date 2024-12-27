import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../core/environment/environment';
import { ExamsAPIAdapter } from './adapter/exams-api.adapter';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private _httpClient : HttpClient, private _examsAPIAdapter : ExamsAPIAdapter) { }

  getExams(): Observable<any> {
    return this._httpClient.get(`${environment.baseURL}exams`).pipe(
      map(res => this._examsAPIAdapter.successAdapt(res)),
      catchError(err => of(this._examsAPIAdapter.errAdapt(err)))
    );
  }
  getSubjectExams(subjectId: string | null): Observable<any> {
    return this._httpClient.get(`${environment.baseURL}exams?subject=${subjectId}`).pipe(
      map(res => this._examsAPIAdapter.successAdapt(res)),
      catchError(err => of(this._examsAPIAdapter.errAdapt(err)))
    );
  };
  getExamById(examId: string): Observable<any> {
    return this._httpClient.get(`${environment.baseURL}exams/${examId}`);
  }
}
