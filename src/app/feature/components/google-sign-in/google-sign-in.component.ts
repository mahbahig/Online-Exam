declare global {
  interface Window {
    google: any;
  }
}


import { AfterViewInit, Component, inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-google-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './google-sign-in.component.html',
  styleUrl: './google-sign-in.component.scss'
})
export class GoogleSignInComponent implements AfterViewInit{

  private readonly _renderer2 = inject(Renderer2);

  ngAfterViewInit(): void {
    this.loadGoogleSignIn();
  }

  loadGoogleSignIn(): void {
    if (window.hasOwnProperty('google')) {
      window['google'].accounts.id.initialize({
        client_id: '405688619797-0e1gtgqeja0h8t7ks12rpgc4s903stug.apps.googleusercontent.com',
        callback: this.handleOauthResponse.bind(this)
      });

      // Render Google Sign-In button
      window['google'].accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          logo_alignment: 'left'
        }
      );
    } else {
      console.error('Google API is not loaded.');
    }
  }

  handleOauthResponse(response: any): void {
    const responsePayload = this.decodeJWTToken(response.credential);
    console.log(responsePayload);

    // Store token in localStorage (or sessionStorage)
    localStorage.setItem('token', JSON.stringify(responsePayload));

    // Redirect after successful sign-in
    window.location.href = '/user/dashboard';
  }

  decodeJWTToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }
}


