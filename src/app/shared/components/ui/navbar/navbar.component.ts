import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthApiService } from 'auth-api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);


  userLogout: boolean = false;

  logout(): void {
    this.userLogout = !this.userLogout;
    this._authApiService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this._router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error(error);
      }
    });

  }
}
