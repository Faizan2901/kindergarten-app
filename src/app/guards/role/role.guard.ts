import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth/auth.service';

export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const cookieService = inject(CookieService);
    const router = inject(Router);

    // 1️⃣ Authentication check
    if (!authService.isAuthenticated()) {
      alert("Please login first!");
      router.navigate(['/login']);
      return false;
    }

    // 2️⃣ Read roles from cookie
    const raw = cookieService.get('PASSID');
    let userRoles: string[] = [];

    if (raw) {
      const decoded = atob(raw);
      userRoles = JSON.parse(decoded);
    }
    
    console.log("User roles:", userRoles);
    console.log("Allowed roles:", allowedRoles);

    // 3️⃣ Check if user has one of the allowed roles
    const hasAccess = userRoles.some(role => allowedRoles.includes(role));

    if (!hasAccess) {
      alert("Access Denied!");
      router.navigate(['/']);
      return false;
    }

    return true;
  };
}
