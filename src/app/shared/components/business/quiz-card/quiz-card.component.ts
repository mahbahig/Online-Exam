import { Component, Input } from '@angular/core';
import { Subject } from '../../../../core/interface/subject/subject';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss'
})
export class QuizCardComponent {
  @Input() subjectList:Subject[] = [];

}
