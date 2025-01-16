import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainButtonComponent } from "../../../shared/components/ui/main-button/main-button.component";
import { GoogleSignInComponent } from "../../../feature/components/google-sign-in/google-sign-in.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, RouterLink, GoogleSignInComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
