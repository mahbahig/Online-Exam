import { Component, Input, OnInit } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { IUserData } from '../../business/interfaces/userdata/iuserData';

@Component({
  selector: 'app-personal-bar',
  standalone: true,
  imports: [ProgressBarModule, ToastModule],
  templateUrl: './personal-bar.component.html',
  styleUrl: './personal-bar.component.scss'
})
export class PersonalBarComponent {
  @Input() userData!: IUserData;
  value = 54;
}
