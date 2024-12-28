import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ExamsService } from '../../services/exams/exams.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IExam } from '../../../shared/components/business/interfaces/exam/iexam';
import { ExamBoxComponent } from '../../../shared/components/ui/exam-box/exam-box.component';

@Component({
  selector: 'app-select-quiz',
  standalone: true,
  imports: [ExamBoxComponent],
  templateUrl: './select-quiz.component.html',
  styleUrl: './select-quiz.component.scss'
})
export class SelectQuizComponent implements OnInit, OnDestroy {

  private readonly _examsService = inject(ExamsService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  examSubsrciption!: Subscription;
  activatedRouteSubsrciption!: Subscription;

  subjectId: string | null = '';

  subjectExams: IExam[] = [];

  
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (params) => {
      this.subjectId = params.get('subjectID');
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.examSubsrciption = this._examsService.getSubjectExams(this.subjectId).subscribe({
      next: (res) => {
        this.subjectExams = res.exams;
      },
      error: (error) => {
        console.error(error);
      }
    });
  };

  ngOnDestroy(): void {
    this.examSubsrciption.unsubscribe();
    this.activatedRouteSubsrciption.unsubscribe();
  };

}