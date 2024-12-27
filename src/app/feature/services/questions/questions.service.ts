import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../core/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _httpClient : HttpClient) { }

  getExamQuestions(examId: string): Observable<any> {
    return this._httpClient.get(`${environment.baseURL}questions?exam=${examId}`);
  };

  getUserHistory(): Observable<any> {
    return this._httpClient.get(`${environment.baseURL}questions/history`);
  };

}
