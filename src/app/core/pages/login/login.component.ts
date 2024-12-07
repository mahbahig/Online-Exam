import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { InputTextModule } from 'primeng/inputtext';
import { NgClass, TitleCasePipe } from '@angular/common';
import { MainButtonComponent } from "../../../shared/components/ui/main-button/main-button.component";
import { RouterLink } from '@angular/router';
import { MessageBoxComponent } from "../../../shared/components/ui/message-box/message-box.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, NgClass, MainButtonComponent, RouterLink, MessageBoxComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [TitleCasePipe]
})
export class LoginComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authApiService = inject(AuthApiService);
  private readonly titleCasePipe = inject(TitleCasePipe);

  // Used to show the loading spinner
  isLoading: boolean = false;
  // Used to store the user status e.g. failure or success
  userStatus!: string;
  // Used to show the user message
  userMessage: string = 'None';

  // Form group for the login form
  loginForm = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
  });

  // Function to handle the register form submission
  loginFormSubmit(): void {
    if (!this.isLoading) {
      if(this.loginForm.valid) {
        this.isLoading = !this.isLoading;
        this._authApiService.login(this.loginForm.value).subscribe({
          next: (res: any) => {
            this.isLoading = !this.isLoading;
            this.userStatus = res.status;
            if (res.status == 'success') {
              this.userMessage = 'Logged In Successfully';
              localStorage.setItem('token', res.token);
            }
            else if (res.status = 'error') {
              this.userMessage =  this.titleCasePipe.transform(res.message);
            }
          },
          error: (err) => {
            this.isLoading = !this.isLoading;
            this.userStatus = 'error';
            this.userMessage = 'An error occurred';
          }
        })
      }
    }
  }

  // Hide and show password
  showPassword: string = 'password';
  toggleShowPassword(): void {
    if(this.showPassword == 'password') {
      this.showPassword = 'text';
    } else { 
      this.showPassword = 'password';
    }
  }
}
