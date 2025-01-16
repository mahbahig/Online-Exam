import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);

  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('token') != null) {
      _router.navigate(['/user/dashboard']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
