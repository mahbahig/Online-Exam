import { Component, Input } from '@angular/core';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [MessagesModule],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss'
})
export class MessageBoxComponent {
  @Input() type: string = 'success';
  @Input() message: string = '';
}
