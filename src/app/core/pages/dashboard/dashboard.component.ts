import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PersonalBarComponent } from "../../../shared/components/business/personal-bar/personal-bar.component";
import { QuizCardComponent } from "../../../shared/components/business/quiz-card/quiz-card.component";
import { Subscription } from 'rxjs';
import { SubjectsService } from '../../../feature/services/subjects/subjects.service';
import { Subject } from '../../interface/subject/subject';
import { AuthApiService } from 'auth-api';
import { UserData } from '../../interface/userdata/userData';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PersonalBarComponent, QuizCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private readonly _subjectsService = inject(SubjectsService);
  private readonly _authApiService = inject(AuthApiService);

  subjectList: Subject[] = [];
  userData!: UserData;

  subjectSubsrciption!: Subscription;
  userDataSubsrciption!: Subscription;

  ngOnInit() {
    this.subjectSubsrciption = this._subjectsService.getSubjects().subscribe({
      next: (res) => {
        this.subjectList = res.subjects;
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.userDataSubsrciption = this._authApiService.getUserData().subscribe({
      next: (res) => {
        this.userData = res;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  ngOnDestroy(): void {
    this.subjectSubsrciption.unsubscribe();
    this.userDataSubsrciption.unsubscribe();
  }
}