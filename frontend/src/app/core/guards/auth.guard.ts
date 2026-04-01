import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getAccessToken();

  if (token && token !== 'null' && token !== 'undefined') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
