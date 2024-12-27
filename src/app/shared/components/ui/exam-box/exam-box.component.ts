import { IExam } from './../../business/interfaces/exam/iexam';
import { Component, inject, Input, OnDestroy } from '@angular/core';
import { MainButtonComponent } from "../main-button/main-button.component";
import { DialogModule  } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { QuestionsService } from '../../../../feature/services/questions/questions.service';
import { IQuestion } from '../../business/interfaces/question/iquestion';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-exam-box',
  standalone: true,
  imports: [MainButtonComponent, DialogModule, NgClass],
  templateUrl: './exam-box.component.html',
  styleUrl: './exam-box.component.scss'
})
export class ExamBoxComponent implements OnDestroy{
  @Input() exam!: IExam | null;

  private readonly _QuestionsService = inject(QuestionsService);

  examSubsrciption: Subscription | null = null;

  examQuestions: IQuestion[] = []
  examAnswers: {questionId: string, answer: string}[] = []

  showModal: boolean = false;
  instructionModal: boolean = true;

  currentQuestionIndex: number = 0;

  isLoading: boolean = false;

  selectedAnswer: any ;

  showInstructionModal(): void {
    this.showModal = true;
    if (this.exam) {
      this.isLoading = !this.isLoading;
      this.examSubsrciption = this._QuestionsService.getExamQuestions(this.exam._id).subscribe({
        next: (res) => {
          this.isLoading = !this.isLoading;
          this.examQuestions = res.questions;
          console.log(res);
        },
        error: (error) => {
          this.isLoading = !this.isLoading;
          console.error(error);
        }
      });
    }
  }

  startExam(): void {
      this.instructionModal = false;
  }

  prevQuestion(): void {
    this.examAnswers.pop();
    console.log(this.examAnswers);
    this.currentQuestionIndex--
    this.selectedAnswer = null;
  }

  nextQuestion(questionId: string, answer: string): void {
    this.examAnswers.push({
      questionId: questionId,
      answer: answer
    })
    console.log(this.examAnswers);
    this.currentQuestionIndex++;
    this.selectedAnswer = null;
  }

  isQuestionAnswered(id: string): boolean {
    for (let i = 0; i < this.examAnswers.length; i++) {
      if (this.examAnswers[i].questionId == id) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.examSubsrciption) {
      this.examSubsrciption.unsubscribe();
    }
  }
}
