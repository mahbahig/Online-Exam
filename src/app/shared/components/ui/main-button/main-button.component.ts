import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-main-button',
  standalone: true,
  imports: [],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.scss'
})
export class MainButtonComponent {
  @Input() text: string = 'Next';
  @Input() classes: string = '';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() buttonClicked = new EventEmitter<void>();

  notifyParent() {
    this.buttonClicked.emit();
  }
}
