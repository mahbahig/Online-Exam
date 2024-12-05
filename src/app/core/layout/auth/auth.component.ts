import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainButtonComponent } from "../../../shared/components/ui/main-button/main-button.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
