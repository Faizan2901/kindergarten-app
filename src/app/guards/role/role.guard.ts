import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, switchMap, take } from 'rxjs/operators';
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
      // Step 1: Check if user already available
      map((user: any) => {
        if (user) return user;
        return null;
      }),
      // Step 2: If not, fetch from backend
      switchMap((user: any) => {
        if (user) {
          return of(user);
        } else {
          return userService.getUserInfo().pipe(
            map(res => res.user),
            catchError(err => {
              console.error('❌ Error loading user info in guard:', err);
              router.navigate(['/login']);
              return of(null);
            })
          );
        }
      }),
      // Step 3: Evaluate roles and return true/false
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
