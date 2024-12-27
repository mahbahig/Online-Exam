import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PersonalBarComponent } from "../../../shared/components/ui/personal-bar/personal-bar.component";
import { SubjectCardComponent } from "../../../shared/components/ui/subject-card/subject-card.component";
import { Subscription } from 'rxjs';
import { SubjectsService } from '../../../feature/services/subjects/subjects.service';
import { ISubject } from '../../../shared/components/business/interfaces/subject/isubject';
import { AuthApiService } from 'auth-api';
import { IUserData } from '../../../shared/components/business/interfaces/userdata/iuserData';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PersonalBarComponent, SubjectCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private readonly _subjectsService = inject(SubjectsService);
  private readonly _authApiService = inject(AuthApiService);

  subjectList: ISubject[] = [];
  userData!: IUserData;

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