import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return (route, state) => {
    const authService = inject(AuthService);
    const userService = inject(UserService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      alert('Please login first!');
      router.navigate(['/login']);
      return of(false);
    }

    return userService.currentUser$.pipe(
      take(1),
      map((user: any) => {
        if (!user) {
          alert('User info not loaded!');
          router.navigate(['/login']);
          return false;
        }

        const roles = user.roles.map((role: any) => role.name);
        const hasAccess = roles.some((role: string) => allowedRoles.includes(role));

        if (!hasAccess) {
          alert('Access Denied!');
          router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  };
}
