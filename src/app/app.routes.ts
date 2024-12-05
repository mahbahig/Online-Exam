import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', loadComponent: () => import('./core/layout/auth/auth.component').then((m) => m.AuthComponent),
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', loadComponent: () => import('./core/pages/login/login.component').then((m) => m.LoginComponent)},
            {path: 'register', loadComponent: () => import('./core/pages/register/register.component').then((m) => m.RegisterComponent)},
            {path: 'forgetpassword', loadComponent: () => import('./core/pages/forget-password/forget-password.component').then((m) => m.ForgetPasswordComponent)},
        ]
    },
    
];
