import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private _httpClient : HttpClient) { }

  getExams(): Observable<any> {
    return this._httpClient.get(`${environment.baseURL}exams`);
  }
  getSubjectExams(subjectId: string): Observable<any> {
    return this._httpClient.get(`${environment.baseURL}exams?subject=${subjectId}`);
  }
  getExamById(examId: string): Observable<any> {
    return this._httpClient.get(`${environment.baseURL}exams/${examId}`);
  }
}
