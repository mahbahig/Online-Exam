import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthApiService } from 'auth-api';
import { MainButtonComponent } from '../../../shared/components/ui/main-button/main-button.component';
import { InputTextModule } from 'primeng/inputtext';
import { MessageBoxComponent } from "../../../shared/components/ui/message-box/message-box.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink, MainButtonComponent, InputTextModule, MessageBoxComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [TitleCasePipe]
})
export class RegisterComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authApiService = inject(AuthApiService);
  private readonly titleCasePipe = inject(TitleCasePipe);

  // Used to show the loading spinner
  isLoading: boolean = false;
  // Used to store the user status e.g. failure or success
  userStatus!: string;
  // Used to show the user message
  userMessage: string = 'None';

  // Form group for the register process
  registerForm = this._formBuilder.group({
    firstName: [null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]],
    lastName: [null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]],
    username: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword: [null, [Validators.required]]
  }, { validators: this.checkPasswordMatch });

  // Function to handle the register form submission
  registerFormSubmit(): void {
    if (!this.isLoading) {
      if(this.registerForm.valid) {
        this.isLoading = !this.isLoading;
        this._authApiService.register(this.registerForm.value).subscribe({
          next: (res: any) => {
            this.isLoading = !this.isLoading;
            this.userStatus = res.status;
            this.userMessage = this.titleCasePipe.transform(res.message) ;
          }
        })
      }
    }
  };

  // Function to check if the password and rePassword match
  checkPasswordMatch(control: AbstractControl): {passwordMismatch: true} | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');
    if (password?.value !== rePassword?.value) {
      return { passwordMismatch: true };
    }
    return null;
  };

  // Hide and show password
  showPassword: string = 'password';
  toggleShowPassword(): void {
    if(this.showPassword == 'password') {
      this.showPassword = 'text';
    } else { 
      this.showPassword = 'password';
    }
  };
  // Hide and show confirm password
  showRePassword: string = 'password';
  toggleShowRePassword(): void {
    if(this.showRePassword == 'password') {
      this.showRePassword = 'text';
    } else { 
      this.showRePassword = 'password';
    }
  };
}
