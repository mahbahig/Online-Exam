import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/ui/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { MainButtonComponent } from "../../../shared/components/ui/main-button/main-button.component";
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, MainButtonComponent, InputTextModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  navbarStatus: boolean = false;

  toggleNavbar(): void {
    this.navbarStatus = !this.navbarStatus;
  }

}
