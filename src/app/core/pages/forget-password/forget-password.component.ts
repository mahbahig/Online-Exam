import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { MainButtonComponent } from "../../../shared/components/ui/main-button/main-button.component";
import { MessageBoxComponent } from "../../../shared/components/ui/message-box/message-box.component";
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, MainButtonComponent, MessageBoxComponent, NgClass, InputTextModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);

  // Used to show the current step of the forget password process
  currentStep: number = 1;
  // Used to show the loading spinner
  isLoading: boolean = false;
  // Used to store the user email
  userEmail: string = '';
  // Used to show the user message
  userMsg: string = 'None';
  // Used to store the user status e.g. failure or success
  userStatus: string = '';
  // Used to store the data for the reset password API
  resetPasswordData: Object = {};
  // Used for the verification code timer
  codeTimeout: any;
  // Used for the resend verification code timer
  resendVerificationCode: boolean = false;


  // Form groups for the forget password process
  verifyEmailForm = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  });
  verifyCodeForm = this._formBuilder.group({
    resetCode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });
  resetPasswordForm = this._formBuilder.group({
    password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    confirmPassword: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  }, { validators: this.checkPasswordMatch });

  // Functions for the forget password process. It calls the API service to verify email, verify code and reset password
  verifyEmail(): void {
    this.userMsg = 'None';
    if(!this.isLoading) {
      if(this.verifyEmailForm.valid) {
        if (this.verifyEmailForm.controls.email.value) {
          this.userEmail = this.verifyEmailForm.controls.email.value;
        }
        this.isLoading = !this.isLoading;
        this.codeTimeout = setTimeout(() => {this.resendVerificationCode = true}, 60000);
        this._authApiService.verifyEmail(this.verifyEmailForm.value).subscribe({
          next: (res: any) => {
            this.isLoading = !this.isLoading;
            this.userStatus = res.status;
            if (res.status == 'success') {
              this.userMsg = 'Email Sent Successfully';
              setTimeout(() => {
                this.currentStep = 2;
                this.userMsg = 'None';
              }, 1500)
            }
            else if (res.status == 'error') {
              this.userMsg = res.message;
            }
          },
          error: (err) => {
            this.userStatus = 'error';
            this.userMsg = 'An error occurred';
          }
        })
      }
    }
  }
  verifyCode(): void {
    this.userMsg = 'None';
    if(!this.isLoading) {
      if (this.verifyCodeForm.valid) {
        this.isLoading = !this.isLoading;
        this._authApiService.verifyCode(this.verifyCodeForm.value).subscribe({
          next: (res) => {
            this.isLoading = !this.isLoading;            
            this.userStatus = res.status;
            if (res.status == 'success') {
              this.userMsg = 'Code Verified Successfully';
              setTimeout(() => {
                this.currentStep = 3;
                this.userMsg = 'None';
              }, 1500);
            }
            else if (res.status == 'error') {
              this.userMsg = res.message;
            }
          }, 
          error: (err) => {
            this.isLoading = !this.isLoading;
            this.userStatus = 'error';
            this.userMsg = 'An error occurred';
          }
        })
      }
    }
  }
  resendCode(): void {
    clearTimeout(this.codeTimeout);
    if (this.resendVerificationCode) {
      this.resendVerificationCode = false;
      this.verifyEmail();
    };
  };
  resetPassword(): void {
    
    this.userMsg = 'None';
    if(!this.isLoading) {
      if (this.resetPasswordForm.valid) {
        this.resetPasswordData = {email: this.userEmail, newPassword: this.resetPasswordForm.value.password};
        this.isLoading = !this.isLoading;
        this._authApiService.resetPassword(this.resetPasswordData).subscribe({
          next: (res) => {
            this.isLoading = !this.isLoading;
            this.userStatus = res.status;
            if (res.status == 'success') {
              this.userMsg = 'Password Reset Successfully';
              setTimeout(() => {
                this._router.navigate(['/auth/login']);
                this.userMsg = 'None';
              }, 1500);
            }
            else if (res.status == 'error') {
              this.userMsg = res.message;
            }
          },
          error: (err) => {
            this.isLoading = !this.isLoading;
            this.userStatus = 'error';
            this.userMsg = 'An error occurred';
          }
        })
      }
      else {
        this.userStatus = 'error';
        this.userMsg = 'Passwords do not match';
      }
    }
  }

  // Function to check if the password and re-password match. Used in the reset password form
  checkPasswordMatch(control: AbstractControl): {passwordMismatch: true} | null {
    const password = control.get('password');
    const rePassword = control.get('confirmPassword');
    if (password?.value !== rePassword?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

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
