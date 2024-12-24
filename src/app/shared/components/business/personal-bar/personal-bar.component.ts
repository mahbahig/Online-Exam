import { Component, Input, OnInit } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { UserData } from '../../../../core/interface/userdata/userData';

@Component({
  selector: 'app-personal-bar',
  standalone: true,
  imports: [ProgressBarModule, ToastModule],
  templateUrl: './personal-bar.component.html',
  styleUrl: './personal-bar.component.scss'
})
export class PersonalBarComponent {
  @Input() userData!: UserData;
  value = 54;
}
