import { IExam } from './../../business/interfaces/exam/iexam';
import { Component, inject, Input, OnDestroy } from '@angular/core';
import { MainButtonComponent } from "../main-button/main-button.component";
import { DialogModule  } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { QuestionsService } from '../../../../feature/services/questions/questions.service';
import { IQuestion } from '../../business/interfaces/question/iquestion';
import { DecimalPipe, NgClass } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-exam-box',
  standalone: true,
  imports: [MainButtonComponent, DialogModule, NgClass, ChartModule, DecimalPipe],
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
  questionModal: boolean = false;
  resultModal: boolean = false;

  currentQuestionIndex: number = 0;

  isLoading: boolean = false;

  selectedAnswer: any ;

  timeLeft: number = 15 * 60;
  timer: any;

  correctAnswers: number = 0;

  data: any;
  options: any;

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
          console.log(error);
        }
      });
    }
  }

  startExam(): void {
    this.instructionModal = false;
    this.questionModal = true;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex == 0) {
      return;
    }
    this.examAnswers.pop();
    this.currentQuestionIndex--
    this.selectedAnswer = null;
  }

  nextQuestion(questionId: string, answer: string): void {
    if ((this.currentQuestionIndex + 1) == this.examQuestions.length) {
      this.checkExam();
    }
    else {
      this.examAnswers.push({
        questionId: questionId,
        answer: answer
      })
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
    }
  }

  isQuestionAnswered(id: string): boolean {
    for (let i = 0; i < this.examAnswers.length; i++) {
      if (this.examAnswers[i].questionId == id) {
        return true;
      }
    }
    return false;
  }

  checkExam() {
    clearInterval(this.timer);
    for (let index = 0; index < this.examAnswers.length; index++) {
      if (this.examQuestions[index].correct == this.examAnswers[index].answer) {
        this.correctAnswers++;
      }
    }
    this.questionModal = false;
    this.resultModal = true;

    this.data = {
      labels: ['Correct', 'Incorrect'],
      datasets: [
        {
          data: [this.correctAnswers, (this.examQuestions.length - this.correctAnswers)],
          backgroundColor: ['#02369C', '#CC1010'],
        },
      ],
    };
    this.options = {
      cutout: '95%',
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
    }
  }


  ngOnDestroy(): void {
    if (this.examSubsrciption) {
      this.examSubsrciption.unsubscribe();
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
