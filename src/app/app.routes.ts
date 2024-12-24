import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged/logged.guard';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', loadComponent: () => import('./core/layout/auth/auth.component').then((m) => m.AuthComponent), canActivate:[loggedGuard], 
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', loadComponent: () => import('./core/pages/login/login.component').then((m) => m.LoginComponent)},
            {path: 'register', loadComponent: () => import('./core/pages/register/register.component').then((m) => m.RegisterComponent)},
            {path: 'forgetpassword', loadComponent: () => import('./core/pages/forget-password/forget-password.component').then((m) => m.ForgetPasswordComponent)},
        ]
    },
    { path: 'user', loadComponent: () => import('./core/layout/user/user.component').then((m) => m.UserComponent), canActivate:[authGuard], 
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', loadComponent: () => import('./core/pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)},
            {path: 'quizHistory', loadComponent: () => import('./core/pages/quiz-history/quiz-history.component').then((m) => m.QuizHistoryComponent)},
        ]
    }
];
