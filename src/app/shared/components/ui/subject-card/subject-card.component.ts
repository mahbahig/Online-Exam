import { Component, Input } from '@angular/core';
import { ISubject } from '../../business/interfaces/subject/isubject';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subject-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './subject-card.component.html',
  styleUrl: './subject-card.component.scss'
})
export class SubjectCardComponent {
  @Input() subjectList: ISubject[] = [];

}
